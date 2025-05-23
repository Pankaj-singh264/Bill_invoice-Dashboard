const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
  // ItemId: String,
  id: {
    type: String,
    required: [true, 'Product id is required'],
    trim: true,
    unique: true
  },
  itemName: String,
  category: String,
  quantity: Number,
  price: Number,
}, { timestamps: true });

module.exports = mongoose.model('InventoryItem', inventoryItemSchema);
