const express = require('express');
// const { protect } = require('../middleware/userAuth');
const {
    createInvoice,
    getGSTSummary,
    getInvoices,
    getInvoiceById
} = require('../controllers/invoice');

const router = express.Router();

// All routes are protected
// router.use(protect);

// Create a new invoice
router.post('/', createInvoice);


// Get GST summary
router.get('/gst-summary', getGSTSummary);

// Get all invoices with filtering options
router.get('/', getInvoices);

// Get invoice by ID
router.get('/:id', getInvoiceById);

module.exports = router;