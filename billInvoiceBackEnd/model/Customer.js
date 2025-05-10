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
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
        unique:true,
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
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    invoice: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice',
        required: true
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);
