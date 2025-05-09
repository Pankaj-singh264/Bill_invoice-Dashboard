// routes/inventoryItem.js
const express = require('express');
const {
  addItem,
  getAllItems,
  deleteItem,
  searchItems,
  updateItem,
  getItemById,
} = require('../controllers/inventoryItem');

const router = express.Router();

router.post('/addItem', addItem);
router.get('/', getAllItems);
router.delete('/:id', deleteItem);
// router.get('/search/:query', searchItems);
router.get('/:id', getItemById);
router.put('/:id', updateItem);

module.exports = router;
