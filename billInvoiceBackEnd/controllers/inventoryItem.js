// controllers/itemController.js
const Item = require('../model/inventoryItem');

const addItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json({ message: 'Item added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding item' });
  }
};

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching items' });
  }
};

const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting item' });
  }
};

const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching item' });
  }
};

const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching invoice' });
  }
};

const searchItems = async (req, res) => {
  try {
    const items = await Item.find({
      name: { $regex: req.params.query, $options: 'i' },
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error searching items' });
  }
};

const updateItem = async (req, res) => {
    try {
      const updatedItem = await Item.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true } // This option returns the updated document
      );
      
      if (!updatedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
      
      res.json({ 
        message: 'Item updated successfully', 
        item: updatedItem 
      });
    } catch (error) {
      res.status(500).json({ error: 'Error updating item' });
    }
  };

module.exports = {
  addItem,
  getAllItems,
  deleteItem,
  searchItems,
  updateItem,
  getItemById
};
