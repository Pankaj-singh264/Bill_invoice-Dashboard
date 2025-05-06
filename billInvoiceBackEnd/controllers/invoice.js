<<<<<<< HEAD
const invoiceModel = require('../model/invoice.js');

// Create Invoice
const createInvoice = async (req, res) => {
    try {
        console.log('Creating invoice with data:', JSON.stringify(req.body, null, 2));

        const {
            customer,
            items,
            payment,
            date,
            totals
        } = req.body;

        if (!customer || !items || !payment) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }

        const invoice = new invoiceModel({
            invoiceNumber: `INV-${Date.now()}`,
            customerInfo: {
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                address: customer.address,
                balance: customer.balance
            },
            items: items.map(item => ({
                name: item.item,
                price: Number(item.price),
                quantity: Number(item.qty),
                discount: Number(item.discount)
            })),
            paymentDetails: {
                method: payment.method,
                amountPaid: Number(payment.amountPaid),
                previousBalance: Number(payment.previousBalance),
                currentBill: Number(payment.currentBill),
                remainingBalance: Number(payment.remainingBalance)
            },
            date: date,
            totals: {
                subtotal: Number(totals.subtotal),
                tax: Number(totals.tax),
                grandTotal: Number(totals.grandTotal)
            }
            // userId: req.user._id // Uncomment when auth is implemented
        });

        const savedInvoice = await invoice.save();
        console.log('Invoice saved successfully:', savedInvoice._id);
        
        res.status(201).json({
            success: true,
            data: savedInvoice
        });
    } catch (error) {
        console.error('Invoice creation error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to create invoice'
        });
    }
};

// Get All Invoices
const getAllInvoices = async (req, res) => {
    try {
        const invoices = await invoiceModel.find({
            userId: req.user._id
        });
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch invoices'
        });
    }
};

// Get Invoice by ID
const getInvoiceById = async (req, res) => {
    try {
        const invoice = await invoiceModel.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!invoice) {
            return res.status(404).json({
                success: false,
                error: 'Invoice not found'
            });
        }

        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch invoice'
        });
    }
};

// Update Invoice
const updateInvoice = async (req, res) => {
    try {
        const invoice = await invoiceModel.findOneAndUpdate({
                _id: req.params.id,
                userId: req.user._id
            },
            req.body, {
                new: true,
                runValidators: true
            }
        );

        if (!invoice) {
            return res.status(404).json({
                success: false,
                error: 'Invoice not found'
            });
        }

        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to update invoice'
        });
    }
};

// Delete Invoice
const deleteInvoice = async (req, res) => {
    try {
        const invoice = await invoiceModel.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!invoice) {
            return res.status(404).json({
                success: false,
                error: 'Invoice not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Invoice deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to delete invoice'
        });
    }
};

// Get GST Summary
const getGSTSummary = async (req, res) => {
    try {
        const invoices = await invoiceModel.find({
            userId: req.user._id
        });
        // Add your GST calculation logic here
        const gstSummary = {
            // Add your GST summary structure
        };

        res.status(200).json(gstSummary);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to generate GST summary'
        });
    }
};

module.exports = {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
    getGSTSummary
=======
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
>>>>>>> 381d956219014ba0118730d67358c36bf5ceb3a5
};