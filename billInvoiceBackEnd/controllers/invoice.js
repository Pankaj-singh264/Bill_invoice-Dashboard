const Customer = require('../model/Customer');
const Invoice = require('../model/invoice.js')


const createInvoice = async (req, res) => {
  try {
    const {
      customer,
      items,
      subtotal,
      totalGST,
      grandTotal,
      paymentMethod,
      amountPaid,
      previousBalance,
      remainingBalance
    } = req.body;

    // Validate required fields
    if (!customer || !items || !grandTotal) {
      return res.status(400).json({
        success: false,
        message: 'Customer, items, and grand total are required'
      });
    }

    // Get customer details
    const customerDetails = await Customer.findById(customer);
    if (!customerDetails) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    // Generate invoice number
    const invoiceNumber = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Create the invoice
    const invoice = await Invoice.create({
      customerId: customer,
      customerName: customerDetails.name,
      invoiceNumber,
      date: new Date(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      items: items.map(item => ({
        productId: item.item || item.itemId,
        productName: item.name,
        quantity: Number(item.quantity),
        price: Number(item.price),
        discount: Number(item.discount || 0),
        gstRate: Number(item.gstRate || 18),
        amount: Number(item.price) * Number(item.quantity) * (1 - Number(item.discount || 0) / 100)
      })),
      subtotal: Number(subtotal),
      tax: Number(totalGST),
      totalAmount: Number(grandTotal),
      status: Number(amountPaid) >= Number(grandTotal) ? 'paid' : 'pending',
      paymentMethod,
      amountPaid: Number(amountPaid) || 0,
      previousBalance: Number(previousBalance) || 0,
      remainingBalance: Number(remainingBalance) || 0,
      notes: `Payment Method: ${paymentMethod}`,
      paymentTerms: 'Net 30',
      createdBy: customer
    });

    // Update customer balance
    await Customer.findByIdAndUpdate(
      customer,
      { 
        $set: { balance: Number(remainingBalance) },
        $push: { invoice: invoice._id }
      },
      { new: true }
    );

    // Populate customer details in the response
    const populatedInvoice = await Invoice.findById(invoice._id)
      .populate('customerId', 'name email phoneNumber address gstNumber balance')
      .populate('items.productId', 'name price');

    // Format the response for frontend
    const formattedInvoice = {
      _id: populatedInvoice._id,
      invoiceNumber: populatedInvoice.invoiceNumber,
      date: populatedInvoice.date,
      customer: {
        id: populatedInvoice.customerId._id,
        name: populatedInvoice.customerId.name,
        email: populatedInvoice.customerId.email,
        phone: populatedInvoice.customerId.phoneNumber,
        address: populatedInvoice.customerId.address,
        gstNumber: populatedInvoice.customerId.gstNumber,
        balance: populatedInvoice.customerId.balance
      },
      items: populatedInvoice.items.map(item => ({
        name: item.productName,
        quantity: item.quantity,
        price: item.price,
        discount: item.discount,
        gstRate: item.gstRate,
        amount: item.amount
      })),
      totals: {
        subtotal: populatedInvoice.subtotal,
        tax: populatedInvoice.tax,
        grandTotal: populatedInvoice.totalAmount
      },
      payment: {
        method: populatedInvoice.paymentMethod,
        amountPaid: populatedInvoice.amountPaid,
        previousBalance: populatedInvoice.previousBalance,
        remainingBalance: populatedInvoice.remainingBalance
      },
      status: populatedInvoice.status
    };

    res.status(201).json({
      success: true,
      message: 'Invoice created successfully',
      invoice: formattedInvoice
    });
  } catch (error) {
    console.error('Invoice creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create invoice',
      error: error.message
    });
  }
};





const getGSTSummary = async (req, res) => {
  try {
    // Get date range from query params (optional)
    const { startDate, endDate } = req.query;
    
    // Build query filter
    const filter = { createdBy: req.user._id };
    
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const invoices = await Invoice.find(filter).populate('items.item');

    const gstSummary = invoices.reduce((acc, invoice) => {
      invoice.items.forEach(item => {
        const rate = item.gstRate;
        const amount = item.price * item.quantity * (rate / 100);
        acc[rate] = (acc[rate] || 0) + amount;
      });
      return acc;
    }, {});

    // Create an array of GST rates and amounts
    const gstData = Object.keys(gstSummary).map(rate => ({
      rate: Number(rate),
      amount: gstSummary[rate].toFixed(2)
    }));

    res.json({
      success: true,
      gstData,
      totalInvoices: invoices.length
    });
  } catch (error) {
    //console.error('GST summary error:', error);
    res.status(500).json({
      message: 'Failed to get GST summary',
      error: error.message
    });
  }
};


const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({})
      // Sort by date descending
    
    console.log('Fetched invoices:', invoices);
    
    res.status(200).json({
      success: true,
      count: invoices.length,
      data: invoices
    });
  } catch (error) {
    //console.error('Error fetching invoices:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching invoices',
      error: error.message
    });
  }
};


const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate('customerId', 'name email phone address')
      .populate('items.productId', 'name price');

    if (!invoice) {
      return res.status(404).json({ 
        success: false,
        message: 'Invoice not found' 
      });
    }

    res.json({
      success: true,
      invoice
    });
  } catch (error) {
    //console.error('Get invoice error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch invoice',
      error: error.message
    });
  }
};

// Get customer-specific invoices
const getCustomerInvoices = async (req, res) => {
  try {
    const { customerId } = req.params;
    
    if (!customerId) {
      return res.status(400).json({
        success: false,
        message: 'Customer ID is required'
      });
    }

    // Find all invoices for this customer
    const invoices = await Invoice.find({ customerId })
      .sort({ date: -1 }) // Sort by date descending (newest first)
      .select('invoiceNumber date items totalAmount status'); // Select only needed fields

    // Format the response
    const formattedInvoices = invoices.map(invoice => ({
      _id: invoice._id,
      invoiceNumber: invoice.invoiceNumber,
      date: invoice.date,
      itemCount: invoice.items.length,
      amount: invoice.totalAmount, // Use totalAmount from the schema
      status: invoice.status
    }));

    res.status(200).json({
      success: true,
      invoices: formattedInvoices
    });
  } catch (error) {
    //console.error('Error fetching customer invoices:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch customer invoices',
      error: error.message
    });
  }
};

// Add new invoice
const addInvoice = async (req, res) => {
  try {
    const {
      customer,
      items,
      subtotal,
      totalGST,
      grandTotal,
      paymentMethod,
      amountPaid,
      previousBalance,
      remainingBalance
    } = req.body;

    // Validate required fields
    if (!customer || !items || !grandTotal) {
      return res.status(400).json({
        success: false,
        message: 'Customer, items, and grand total are required'
      });
    }

    // Validate payment method
    const validPaymentMethods = ['cash', 'upi'];
    if (!validPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: `Payment method must be one of: ${validPaymentMethods.join(', ')}`
      });
    }

    // Get customer details
    const customerDoc = await Customer.findById(customer);
    if (!customerDoc) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    // Generate unique invoice number
    // Create the invoice with properly mapped fields
    const invoice = await Invoice.create({
      customerId: customer,
      customerName: customerDoc.name,
      invoiceNumber,
      date: new Date(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      items: items.map(item => ({
        productId: item.productId,
        productName: item.productName,
        quantity: Number(item.quantity),
        price: Number(item.price),
        amount: Number(item.amount),
        discount: item.discount || 0,
        gstRate: item.gstRate || 18
      })),
      subtotal: Number(subtotal),
      tax: Number(totalGST),
      totalAmount: Number(grandTotal),
      status: Number(amountPaid) >= Number(grandTotal) ? 'paid' : 'pending',
      paymentMethod,
      amountPaid: Number(amountPaid) || 0,
      previousBalance: Number(previousBalance) || 0,
      remainingBalance: Number(remainingBalance) || 0,
      notes: `Payment Method: ${paymentMethod}`,
      paymentTerms: 'Net 30',
      createdBy: customer // Using customer ID as created by since we don't have user context
    });

    // Update customer balance if needed
    if (remainingBalance !== undefined) {
      await Customer.findByIdAndUpdate(
        customer,
        { $set: { balance: Number(remainingBalance) } },
        { new: true }
      );
    }

    res.status(201).json({
      success: true,
      message: 'Invoice created successfully',
      invoice
    });
  } catch (error) {
    //console.error('Invoice creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create invoice',
      error: error.message
    });
  }
};

module.exports = {
  createInvoice,
  getGSTSummary,
  getInvoices,
  getInvoiceById,
  getCustomerInvoices,
  addInvoice
};