const Customer = require('../model/Customer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Get all invoices
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .sort({ date: -1 })
      .populate('customerId', 'name email');
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get invoices by customer
exports.getCustomerInvoices = async (req, res) => {
  try {
    const { customerId } = req.params;
    const invoices = await Invoice.find({ customerId })
      .sort({ date: -1 })
      .populate('customerId', 'name email');
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single invoice
exports.getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate('customerId', 'name email address phone')
      .populate('items.productId', 'name description');
    
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new invoice
exports.createInvoice = async (req, res) => {
  try {
    const { customerId, items, dueDate, notes, paymentTerms } = req.body;

    // Get customer details
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const tax = subtotal * 0.18; // 18% GST
    const amount = subtotal + tax;

    // Generate invoice number
    const invoiceNumber = await Invoice.generateInvoiceNumber();

    const invoice = new Invoice({
      invoiceNumber,
      customerId,
      customerName: customer.name,
      items,
      subtotal,
      tax,
      amount,
      dueDate,
      notes,
      paymentTerms,
      createdBy: req.user._id
    });

    const savedInvoice = await invoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update invoice
exports.updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.items) {
      // Recalculate totals if items are updated
      updates.subtotal = updates.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
      updates.tax = updates.subtotal * 0.18;
      updates.amount = updates.subtotal + updates.tax;
    }

    const invoice = await Invoice.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.json(invoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete invoice
exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Download invoice as PDF
exports.downloadInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate('customerId', 'name email address phone')
      .populate('items.productId', 'name description');

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Create PDF
    const doc = new PDFDocument();
    const filename = `invoice-${invoice.invoiceNumber}.pdf`;

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    // Pipe the PDF to the response
    doc.pipe(res);

    // Add content to PDF
    doc.fontSize(25).text('Invoice', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Invoice Number: ${invoice.invoiceNumber}`);
    doc.text(`Date: ${new Date(invoice.date).toLocaleDateString()}`);
    doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`);
    doc.moveDown();
    
    // Customer details
    doc.fontSize(14).text('Customer Details');
    doc.fontSize(12).text(`Name: ${invoice.customerName}`);
    doc.text(`Email: ${invoice.customerId.email}`);
    doc.text(`Address: ${invoice.customerId.address}`);
    doc.text(`Phone: ${invoice.customerId.phone}`);
    doc.moveDown();

    // Items table
    doc.fontSize(14).text('Items');
    let y = doc.y + 20;
    doc.fontSize(12);
    
    // Table headers
    doc.text('Item', 50, y);
    doc.text('Quantity', 250, y);
    doc.text('Price', 350, y);
    doc.text('Amount', 450, y);
    
    y += 20;
    
    // Table content
    invoice.items.forEach(item => {
      doc.text(item.productName, 50, y);
      doc.text(item.quantity.toString(), 250, y);
      doc.text(`₹${item.price.toFixed(2)}`, 350, y);
      doc.text(`₹${(item.quantity * item.price).toFixed(2)}`, 450, y);
      y += 20;
    });

    doc.moveDown();
    doc.text(`Subtotal: ₹${invoice.subtotal.toFixed(2)}`, { align: 'right' });
    doc.text(`Tax (18%): ₹${invoice.tax.toFixed(2)}`, { align: 'right' });
    doc.text(`Total Amount: ₹${invoice.amount.toFixed(2)}`, { align: 'right' });

    // Finalize PDF
    doc.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 