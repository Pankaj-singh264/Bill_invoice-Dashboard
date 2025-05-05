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
};