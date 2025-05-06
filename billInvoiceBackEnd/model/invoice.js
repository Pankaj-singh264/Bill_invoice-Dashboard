const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
<<<<<<< HEAD
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
=======
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
>>>>>>> 381d956219014ba0118730d67358c36bf5ceb3a5
    },
    email: {
      type: String,
      required: true
    },
<<<<<<< HEAD
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
=======
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
>>>>>>> 381d956219014ba0118730d67358c36bf5ceb3a5
});

module.exports = mongoose.model('Invoice', invoiceSchema);