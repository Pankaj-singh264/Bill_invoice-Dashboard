// routes/inventoryItem.js
const express = require('express');
const {
  addItem,
  getAllItems,
  deleteItem,
  searchItems,
  updateItem,
} = require('../controllers/inventoryItem');

const router = express.Router();

router.post('/add', addItem);
router.get('/', getAllItems);
router.delete('/:id', deleteItem);
router.get('/search/:query', searchItems);
router.put('/:id', updateItem);

module.exports = router;
