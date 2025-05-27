// controllers/itemController.js
const Item = require('../model/inventoryItem');

const addItem = async (req, res) => {
     try {
       const {
         ItemId,
         itemName,
         category,
         quantity,
         price
       } = req.body;

       // Basic validation
       if (!ItemId || !itemName || !price || !quantity) {
         return res.status(400).json({
           success: false,
           message: 'Item ID, name, price, and quantity are required fields'
         });
       }

       // Check if item with same ID already exists
       const existingItem = await Item.findOne({ itemId: ItemId });
       if (existingItem) {
         return res.status(400).json({
           success: false,
           message: 'Item with this ID already exists'
         });
       }

       const item = await Item.create({
         itemId: ItemId,
         itemName,
         category: category || 'General',
         quantity: Number(quantity),
         price: Number(price)
       });

       return res.status(201).json({
         success: true,
         message: 'Item created successfully',
         data: item
       });
     } catch (error) {
       //console.error('Error in addItem:', error);
       return res.status(500).json({
         success: false,
         message: 'Error creating item',
         error: error.message
       });
     }
};

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: 'Items fetched successfully',
      data: items
    });
  } catch (error) {
    //console.error('Error in getAllItems:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching items',
      error: error.message
    });
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
