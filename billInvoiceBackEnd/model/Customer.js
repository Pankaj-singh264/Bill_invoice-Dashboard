const mongoose = require('mongoose');

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
