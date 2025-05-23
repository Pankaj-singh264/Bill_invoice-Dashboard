const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
  // ItemId: String,
  itemId: {
    type: String,
    required: [true, 'Item ID is required'],
    trim: true,
    unique: true
  },
  itemName: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true
  },
  category: {
    type: String,
    trim: true,
    default: 'General'
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  }
}, { timestamps: true });

module.exports = mongoose.model('InventoryItem', inventoryItemSchema);
