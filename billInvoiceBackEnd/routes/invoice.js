const express = require('express');
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

module.exports = router;