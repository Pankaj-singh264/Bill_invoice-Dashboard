
const Customer = require('../model/Customer');

// Add new customer
exports.addCustomer = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const newCustomer = new Customer(req.body);
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const deletedCustomer = await Customer.findByIdAndDelete(customerId);
    
    if (!deletedCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    
    res.status(200).json({ message: 'Customer deleted successfully', customerId });
  } catch (err) {
    res.status(500).json({ error: err.message });
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


//update Customer
exports.updateCustomer = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const updateData = req.body;

    const customer = await Customer.findByIdAndUpdate(
      id, {
        $set: updateData
      }, {
        new: true
      }
    );

    if (!customer) {
      return res.status(404).json({
        message: 'Customer not found'
      });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({
      message: 'Error updating customer',
      error: error.message
    });
  }
};

//update Cutomers remainig balance
exports.updateBalance = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      balance
    } = req.body;

    const customer = await Customer.findByIdAndUpdate(
      id, {
        $set: {
          balance: balance
        }
      }, {
        new: true
      }
    );

    if (!customer) {
      return res.status(404).json({
        message: 'Customer not found'
      });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({
      message: 'Error updating balance',
      error: error.message
    });
  }
};