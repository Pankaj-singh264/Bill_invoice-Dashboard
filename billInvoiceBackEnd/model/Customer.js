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
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phoneNumber:{
        type: String,
        required: true,
        unique: true,
    },
    items: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        },
        quantity: {
            type: Number,
            default: 0
        },
        price: {
            type: Number,
            default: 0
        },
        gstRate: {
            type: Number,
            default: 0
        }
    }],
    invoice: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice'
    }],
    balance: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);
