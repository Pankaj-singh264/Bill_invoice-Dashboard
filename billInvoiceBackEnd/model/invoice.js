const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  invoiceNumber: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item'
    },
    productName: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative']
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'Discount cannot be negative'],
      max: [100, 'Discount cannot exceed 100%']
    },
    gstRate: {
      type: Number,
      default: 18,
      min: [0, 'GST rate cannot be negative']
    },
    amount: {
      type: Number,
      required: true,
      min: [0, 'Amount cannot be negative']
    }
  }],
  subtotal: {
    type: Number,
    required: true,
    min: [0, 'Subtotal cannot be negative']
  },
  tax: {
    type: Number,
    required: true,
    min: [0, 'Tax cannot be negative']
  },
  totalAmount: {
    type: Number,
    required: true,
    min: [0, 'Total amount cannot be negative']
  },
  status: {
    type: String,
    enum: ['draft', 'pending', 'paid', 'overdue', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'upi', 'card', 'bank_transfer'],
    required: true
  },
  amountPaid: {
    type: Number,
    default: 0,
    min: [0, 'Amount paid cannot be negative']
  },
  previousBalance: {
    type: Number,
    default: 0
  },
  remainingBalance: {
    type: Number,
    default: 0
  },
  notes: String,
  paymentTerms: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});



module.exports = mongoose.model('Invoice', invoiceSchema);