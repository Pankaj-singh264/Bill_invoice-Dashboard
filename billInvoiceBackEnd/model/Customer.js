const mongoose = require('mongoose');

<<<<<<< HEAD
const customarSchema = new mongoose.Schema({
  companyName: String,
  name: String,
  address: String,
  country: String,
  phone: String,
  email: String,
  password: String,
  billingAddress: String,
  state: String,
  pincode: String,
  city: String,
  gstRegistered: Boolean,
  gstin: String,
  pan: String,
  eInvoiceEnabled: Boolean,
  businessType: String,
  industrialType: String,
  registrationType: String,
  terms: String,
  signature: String, 
});

module.exports = mongoose.model('Customar', customarSchema);
=======
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gstNumber: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);
>>>>>>> 381d956219014ba0118730d67358c36bf5ceb3a5
