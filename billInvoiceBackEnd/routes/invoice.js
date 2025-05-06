const express = require('express');
<<<<<<< HEAD
const router = express.Router();

const {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
    getGSTSummary
} = require('../controllers/invoice');

// Invoice routes
router.post('/',  createInvoice);
router.get('/',  getAllInvoices);
router.get('/:id',  getInvoiceById);
router.put('/:id',  updateInvoice);
router.delete('/:id',  deleteInvoice);
router.get('/gst-summary',  getGSTSummary);
=======
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
>>>>>>> 381d956219014ba0118730d67358c36bf5ceb3a5

// Get all invoices with filtering options
router.get('/', getInvoices);

// Get invoice by ID
router.get('/:id', getInvoiceById);

module.exports = router;