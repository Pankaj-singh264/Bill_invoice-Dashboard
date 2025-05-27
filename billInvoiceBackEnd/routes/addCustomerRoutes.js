const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const invoiceController = require('../controllers/customerInvoiceController');

// Customer routes
router.post('/', customerController.addCustomer);
router.get('/', customerController.getAllCustomers);
router.get('/:id',customerController.getCustomerbyId)
router.delete('/:id', customerController.deleteCustomer);
router.post('/delete-multiple', customerController.deleteMultipleCustomers);
router.put('/:id', customerController.updateCustomer);
router.patch('/:id/balance', customerController.updateCustomerBalance);

// Customer invoice routes
router.get('/invoices/:customerId', invoiceController.getCustomerInvoices);
router.post('/invoice/:customerId', invoiceController.addInvoice);

module.exports = router;
