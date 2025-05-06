
// const User = require('../model/user');
// const Item = require('../model/item');

// // Utility function to send error
// const sendError = (res, status, message) => {
//     return res.status(status).json({ success: false, message });
// };

// // Utility function to check required fields
// const validateFields = (fields) => {
//     return Object.values(fields).every(field => field !== undefined && field !== null && field !== '');
// };

// // Get all items for the logged-in user
// const allItems = async (req, res) => {
//     try {
//         const items = await Item.find({ user: req.user?._id });

//         if (!items.length) return sendError(res, 404, 'No items found');

//         return res.status(200).json({ success: true, items });
//     } catch (error) {
//         return sendError(res, 500, error.message);
//     }
// };

// // Add a new item
// const addItem = async (req, res) => {
//     try {
//         const { user, name, price, quantity, discount } = req.body;

//         if (!validateFields({ name, price, quantity, discount })) {
//             return sendError(res, 400, 'All fields are required');
//         }

//         const item = await Item.create({
//             user,
//             name,
//             price,
//             quantity,
//             discount
//         });

//         return res.status(201).json({
//             success: true,
//             message: 'Item created successfully',
//             item
//         });
//     } catch (error) {
//         return sendError(res, 500, error.message);
//     }
// };

// // Delete an item
// const deleteItem = async (req, res) => {
//     try {
//         const { id } = req.params;

//         if (!id) return sendError(res, 400, 'Item ID is required');

//         const item = await Item.findOneAndDelete({
//             _id: id,
//             user: req.user._id
//         });

//         if (!item) return sendError(res, 404, 'Item not found');

//         return res.status(200).json({
//             success: true,
//             message: 'Item deleted successfully',
//             item
//         });
//     } catch (error) {
//         return sendError(res, 500, error.message);
//     }
// };

// // Update an item
// const updateItem = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, price, quantity, discount } = req.body;

//         const item = await Item.findOne({
//             _id: id,
//             user: req.user._id
//         });

//         if (!item) return sendError(res, 404, 'Item not found');

//         if (name !== undefined) item.name = name;
//         if (price !== undefined) item.price = price;
//         if (quantity !== undefined) item.quantity = quantity;
//         if (discount !== undefined) item.discount = discount;

//         const updatedItem = await item.save();

//         return res.status(200).json({
//             success: true,
//             message: 'Item updated successfully',
//             item: updatedItem
//         });
//     } catch (error) {
//         return sendError(res, 500, error.message);
//     }
// };

// // Get a single item by ID
// const getItem = async (req, res) => {
//     try {
//         const { id } = req.params;

//         if (!id) return sendError(res, 400, 'Item ID is required');

//         const item = await Item.findOne({
//             _id: id,
//             user: req.user._id
//         });

//         if (!item) return sendError(res, 404, 'Item not found');

//         return res.status(200).json({
//             success: true,
//             message: 'Item found',
//             item
//         });
//     } catch (error) {
//         return sendError(res, 500, error.message);
//     }
// };

// module.exports = {
//     allItems,
//     addItem,
//     deleteItem,
//     updateItem,
//     getItem
// };




const User = require('../model/user');
const Item = require('../model/item');

// Utility function to send error
const sendError = (res, status, message) => {
    return res.status(status).json({ success: false, message });
};

// Utility function to check required fields
const validateFields = (fields) => {
    return Object.values(fields).every(field => field !== undefined && field !== null && field !== '');
};

// Get all items for a specific customer
const allItems = async (req, res) => {
    try {
        const customerId = req.query.customerId || req.params.customerId;
        
        if (!customerId) {
            return sendError(res, 400, 'Customer ID is required');
        }
        
        const items = await Item.find({ customer: customerId }).sort({ createdAt: -1 });

        // Return empty array instead of 404 to make frontend handling easier
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
        const { customer, name, price, quantity, discount } = req.body;

        if (!validateFields({ customer, name, price, quantity, discount })) {
            return sendError(res, 400, 'All fields are required');
        }

        const item = await Item.create({
            customer, // Use customer instead of user
            name,
            price,
            quantity,
            discount
        });

        return res.status(201).json({
            success: true,
            message: 'Item created successfully',
            item
        });
    } catch (error) {
        return sendError(res, 500, error.message);
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
