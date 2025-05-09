const express = require('express');
const router = express.Router();
const {
    allItems,
    addItem,
    deleteItem,
    updateItem,
    getItem
} = require('../controllers/item');

// Get all items (with optional customer filter)
router.get('/', allItems);
router.get('/customer/:customerId', allItems);

// CRUD operations
router.post('/', addItem);
router.delete('/:id', deleteItem);
router.put('/:id', updateItem);
router.get('/:id', getItem);

module.exports = router;