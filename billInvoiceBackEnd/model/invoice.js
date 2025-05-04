const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    customerInfo: {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        email: {
            type: String
        },
        phone: {
            type: String
        }
    },
    items: [{
        description: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    }],
    paymentDetails: {
        subtotal: {
            type: Number,
            required: true
        },
        gst: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Invoice', invoiceSchema);