<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const Customer = require('../model/Customer');

// Add new customer
router.post('/', async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log the request body for debugging
    
    const newCustomer = new Customer(req.body);
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
=======

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
>>>>>>> 381d956219014ba0118730d67358c36bf5ceb3a5
