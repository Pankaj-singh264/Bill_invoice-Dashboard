const User = require('../model/user');
const Item = require('../model/item');
const item = require('../model/item');
// const Invoice = require('../model/invoice');   

const allItems = async (req, res) => {
    const items = await Item.find({});
    if (!items) {
        return res.status(404).json({
            message: 'No items found'
        });
    }
    return res.status(200).json(items);

}
const addItem = async (req, res) => {
    const {
        name,
        price,
        quantity,
        discount
    } = req.body;
    if (!name || !price || !quantity || !discount) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }
    const item = await Item.create({
        name,
        price,
        quantity,
        discount
    });
    return res.status(201).json({
        message: 'Item created successfully',
        item
    });
}
const deleteItem = async (req, res) => {
    const {
        id
    } = req.params;
    if (!id) {
        return res.status(400).json({
            message: 'Item id is required'
        });
    }
    const item = await Item.findByIdAndDelete(id)
    if (!items) {
        return res.status(404).json({
            message: 'Item not found'
        });
    }
    return res.status(200).json({
        message: 'Item deleted successfully',
        item
    });
}


const updateItem = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        name,
        price,
        quantity,
        discount
    } = req.body;
    //find and items verify
    const item = await Item.findOne({
        _id: id,
        // user: req.user._id
    })
    if (!item) {
        return res.status(404).json({
            message: 'Item not found'
        });
    }
    if (nama !== undefined) item.name = name;
    if (price !== undefined) item.price = price;
    if (discount !== undefined) item.discount = discount;
    if (quantity !== undefined) item.qunatity = qunatity

    const updatedItem = await item.save()
    res.status(200).json({
        message: 'Item updated successfully',
        item: updatedItem
    });
}
const getItem = async (req, res) => {
    const {
        id
    } = req.params;
    if (!id) {
        return res.status(400).json({
            message: 'Item id is required'
        });
    }
    const item = await Item.findById(id)
    if (!item) {
        return res.status(404).json({
            message: 'Item not found'
        });
    }
    return res.status(200).json({
        message: 'Item found',
        item
    });
}

module.exports = {
    allItems,
    addItem,
    deleteItem,
    updateItem,
    getItem
}