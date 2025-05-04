const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/userAuth');
const { 
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
    getGSTSummary
} = require('../controllers/invoice');

// Invoice routes
router.post('/', protect, createInvoice);
router.get('/', protect, getAllInvoices);
router.get('/:id', protect, getInvoiceById);
router.put('/:id', protect, updateInvoice);
router.delete('/:id', protect, deleteInvoice);
router.get('/gst-summary', protect, getGSTSummary);

module.exports = router;