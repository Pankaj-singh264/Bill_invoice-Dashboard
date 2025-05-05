const Invoice = require('../model/invoice');
const Customer = require('../model/Customer');
const Item = require('../model/item');

/**
 * @desc    Create new invoice
 * @route   POST /api/invoices
 * @access  Private
 */
const createInvoice = async (req, res) => {
  try {
    const {
      customer,
      invoiceNumber,
      items,
      subtotal,
      totalGST,
      grandTotal,
      paymentMethod,
      amountPaid,
      previousBalance,
      remainingBalance
    } = req.body;

    // First, create or find the customer
    let customerDoc;
    if (typeof customer === 'object') {
      // If customer is sent as an object, create/find customer first
      customerDoc = await Customer.findOne({ name: customer.name }) || 
                   await Customer.create({
                     name: customer.name,
                     gstNumber: customer.gstNumber,
                     address: customer.address
                   });
    } else {
      // If customer is sent as ID, verify it exists
      customerDoc = await Customer.findById(customer);
      if (!customerDoc) {
        return res.status(404).json({
          message: 'Customer not found'
        });
      }
    }

    // Create the invoice with customer reference
    const invoice = await Invoice.create({
      customer: customerDoc._id,
      invoiceNumber: invoiceNumber || `INV-${Date.now()}`,
      items: items.map(item => ({
        item: item.item,
        quantity: item.quantity,
        price: item.price,
        gstRate: item.gstRate
      })),
      subtotal,
      totalGST,
      grandTotal,
      paymentDetails: {
        method: paymentMethod,
        amountPaid: amountPaid,
        previousBalance: previousBalance,
        remainingBalance: remainingBalance
      }
    });

    // Populate the customer details
    await invoice.populate('customer');
    await invoice.populate('items.item');

    // Update customer balance
    await Customer.findByIdAndUpdate(
      customerDoc._id,
      { balance: remainingBalance },
      { new: true }
    );

    res.status(201).json({
      success: true,
      invoice
    });
  } catch (error) {
    console.error('Invoice creation error:', error);
    res.status(500).json({
      message: 'Failed to create invoice',
      error: error.message
    });
  }
};

/**
 * @desc    Get GST summary
 * @route   GET /api/invoices/gst-summary
 * @access  Private
 */
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
    console.error('GST summary error:', error);
    res.status(500).json({
      message: 'Failed to get GST summary',
      error: error.message
    });
  }
};

/**
 * @desc    Get all invoices
 * @route   GET /api/invoices
 * @access  Private
 */
const getInvoices = async (req, res) => {
  try {
    const { customerId, startDate, endDate, limit = 10, page = 1 } = req.query;
    
    // Build filter
    const filter = { createdBy: req.user._id };
    
    if (customerId) filter['customer._id'] = customerId;
    
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const invoices = await Invoice.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
      
    const total = await Invoice.countDocuments(filter);
    
    res.json({
      success: true,
      invoices,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalResults: total
      }
    });
  } catch (error) {
    console.error('Get invoices error:', error);
    res.status(500).json({
      message: 'Failed to fetch invoices',
      error: error.message
    });
  }
};

/**
 * @desc    Get invoice by ID
 * @route   GET /api/invoices/:id
 * @access  Private
 */
const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    }).populate('items.item');

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.json({
      success: true,
      invoice
    });
  } catch (error) {
    console.error('Get invoice error:', error);
    res.status(500).json({
      message: 'Failed to fetch invoice',
      error: error.message
    });
  }
};

module.exports = {
  createInvoice,
  getGSTSummary,
  getInvoices,
  getInvoiceById
};