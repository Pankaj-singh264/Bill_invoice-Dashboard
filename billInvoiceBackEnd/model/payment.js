const mongoose = require('mongoose')

const PaymentShema = new mongoose.Schema({
    rezorpay_orderId: {
        type: String,
        required: true
    },
    rezorpay_paymentId: {
        type: String,
        require: true,
    },
    rezorpay_signature: {

        type: String,
        require: true,

    },
    date: {
        type: Date,
        default: Date.now
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
})


module.exports = mongoose.model('payments',PaymentShema)