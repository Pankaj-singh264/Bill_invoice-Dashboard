const Item = require('../model/item');



// Utility function to check required fields
const validateFields = (fields) => {
    return Object.values(fields).every(field => field !== undefined && field !== null && field !== '');
};

// Get all items for a specific customer
const allItems = async (req, res) => {
   try {
    const items = await Item.find({});
    return res.status(200).json({
        success: true,
        items,
        count: items.length
    });
   } catch (error) {
    return sendError(res, 500, error.message);
   }
};

// Add a new item
const addItem = async (req, res) => {
    try {
        ////console.log('Request body:', req.body);
        const {  name, price, quantity, discount, gstRate } = req.body;

        // Basic validation
        if (!name || !price || !quantity) {
            return sendError(res, 400, 'Name, price, and quantity are required fields');
        }

        const item = await Item.create({
            customer,
            name,
            price: Number(price),
            quantity: Number(quantity),
            discount: Number(discount || 0),
            gstRate: Number(gstRate || 18)
        });

        return res.status(201).json({
            success: true,
            message: 'Item created successfully',
            item
        });
    } catch (error) {
        //console.error('Error in addItem:', error);
        return sendError(res, 500, error.message || 'Internal server error while creating item');
    }
};

// Delete an item
const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { customerId } = req.query;

        if (!id) return sendError(res, 400, 'Item ID is required');

        const item = await Item.findOneAndDelete({
            _id: id,
            customer: customerId
        });

        if (!item) return sendError(res, 404, 'Item not found');

        return res.status(200).json({
            success: true,
            message: 'Item deleted successfully',
            item
        });
    } catch (error) {
        return sendError(res, 500, error.message);
    }
};

// Update an item
const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, quantity, discount, customerId } = req.body;

        const item = await Item.findOne({
            _id: id,
            customer: customerId
        });

        if (!item) return sendError(res, 404, 'Item not found');

        if (name !== undefined) item.name = name;
        if (price !== undefined) item.price = price;
        if (quantity !== undefined) item.quantity = quantity;
        if (discount !== undefined) item.discount = discount;

        const updatedItem = await item.save();

        return res.status(200).json({
            success: true,
            message: 'Item updated successfully',
            item: updatedItem
        });
    } catch (error) {
        return sendError(res, 500, error.message);
    }
};

// Get a single item by ID
const getItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { customerId } = req.query;

        if (!id) return sendError(res, 400, 'Item ID is required');
        if (!customerId) return sendError(res, 400, 'Customer ID is required');

        const item = await Item.findOne({
            _id: id,
            customer: customerId
        });

        if (!item) return sendError(res, 404, 'Item not found');

        return res.status(200).json({
            success: true,
            message: 'Item found',
            item
        });
    } catch (error) {
        return sendError(res, 500, error.message);
    }
};

module.exports = {
    allItems,
    addItem,
    deleteItem,
    updateItem,
    getItem
};
