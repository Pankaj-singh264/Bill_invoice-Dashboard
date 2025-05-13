const Customer = require('../model/Customer');

// Add new customer
exports.addCustomer = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    // const newCustomer = new Customer(req.body);
    const {name, email, phoneNumber, address, balance} = req.body;
    
    // Validate required fields
    if (!name || !email || !phoneNumber || !address) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    // Check if customer with same email already exists
    const existingCustomer = await Customer.findOne({ email: req.body.email });
    if (existingCustomer) {
      return res.status(400).json({
        success: false,
        error: 'Customer with this email already exists'
      });
    }

    // Check if customer with same phone number already exists
    const existingPhone = await Customer.findOne({ phoneNumber: req.body.phoneNumber });
    if (existingPhone) {
      return res.status(400).json({
        success: false,
        error: 'Customer with this phone number already exists'
      });
    }
  const newCustomer = await  Customer.create({name, email, phoneNumber, address, balance});
  console.log(newCustomer);
  res.status(201).json({
    success: true,
    data: newCustomer
  })
    // const savedCustomer = await newCustomer.save();
    // res.status(201).json({
    //   success: true,
    //   data: savedCustomer
    // });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: customers
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const deletedCustomer = await Customer.findByIdAndDelete(customerId);
    
    if (!deletedCustomer) {
      return res.status(404).json({
        success: false,
        error: 'Customer not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: deletedCustomer
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Delete multiple customers
exports.deleteMultipleCustomers = async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'No customer IDs provided' });
    }
    
    const result = await Customer.deleteMany({ _id: { $in: ids } });
    
    res.status(200).json({ 
      message: 'Customers deleted successfully', 
      count: result.deletedCount 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update customer
exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const customer = await Customer.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({
        success: false,
        error: 'Customer not found'
      });
    }

    res.status(200).json({
      success: true,
      data: customer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Update customer balance
exports.updateCustomerBalance = async (req, res) => {
  try {
    const { id } = req.params;
    const { balance } = req.body;

    const customer = await Customer.findByIdAndUpdate(
      id,
      { $set: { balance } },
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({
      message: 'Error updating balance',
      error: error.message
    });
  }
};