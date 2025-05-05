const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true
  },
  // customerID: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'customer',
  //   required: true

  // },
  customerInfo: {

    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String
    },
    address: {
      type: String
    },
    balance: {
      type: Number,
      default: 0
    }
  },
  items: [{
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      default: 0
    }
  }],
  paymentDetails: {
    method: {
      type: String,
      required: true,
      enum: ['cash', 'card', 'upi']
    },
    amountPaid: {
      type: Number,
      required: true
    },
    previousBalance: {
      type: Number,
      default: 0
    },
    currentBill: {
      type: Number,
      required: true
    },
    remainingBalance: {
      type: Number,
      default: 0
    }
  },
  date: {
    type: String,
    required: true
  },
  totals: {
    subtotal: {
      type: Number,
      required: true
    },
    tax: {
      type: Number,
      required: true
    },
    grandTotal: {
      type: Number,
      required: true
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Invoice', invoiceSchema);