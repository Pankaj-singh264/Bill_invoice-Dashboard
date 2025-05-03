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
