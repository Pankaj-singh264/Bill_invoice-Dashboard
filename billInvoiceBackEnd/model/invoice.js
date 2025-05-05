const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    invoiceNumber: {
        type: String,
        required: true,
        unique: true
    },
    items: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: Number,
        gstRate: Number
    }]
});

module.exports = mongoose.model('Invoice', invoiceSchema);