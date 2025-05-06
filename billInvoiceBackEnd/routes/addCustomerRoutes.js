
// const express = require('express');
// const router = express.Router();
// const customerController = require('../controllers/customerController');

// router.post('/', customerController.addCustomer);
// router.get('/', customerController.getAllCustomers);

// router.delete('/:id', customerController.deleteCustomer);

// router.post('/delete-multiple', customerController.deleteMultipleCustomers);

// module.exports = router;

const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const invoiceController = require('../controllers/customerInvoiceController');

// Customer routes
router.post('/', customerController.addCustomer);
router.get('/', customerController.getAllCustomers);
router.delete('/:id', customerController.deleteCustomer);
router.post('/delete-multiple', customerController.deleteMultipleCustomers);

// Customer invoice routes
router.get('/invoices/:customerId', invoiceController.getCustomerInvoices);
router.post('/invoice/:customerId', invoiceController.addInvoice);

module.exports = router;
