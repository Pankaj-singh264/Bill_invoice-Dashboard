const invoiceModel = require('../model/invoice.js');

// Create Invoice
const createInvoice = async (req, res) => {
    console.log('req.body', req.body);
    try {
        const {
            customerInfo,
            items,
            paymentDetails,
            
        } = req.body;

        const invoice = new invoiceModel({
            customerInfo,
            items,
            paymentDetails,
            date,
            userId: req.user._id // Add user reference
        });

        const savedInvoice = await invoice.save();
        res.status(201).json(savedInvoice);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to create invoice'
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