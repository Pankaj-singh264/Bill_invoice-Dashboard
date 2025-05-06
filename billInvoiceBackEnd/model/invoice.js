const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    email: {
      type: String,
    //   required: true
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