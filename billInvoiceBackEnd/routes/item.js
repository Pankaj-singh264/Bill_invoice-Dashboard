const express = require('express');
const router = express.Router();
const { allItems, addItem, deleteItem, updateItem, getItem } = require('../controllers/item');


router.get('/',allItems)
router.post('/addItem',addItem)
router.delete('/deleteItem/:id',deleteItem)
router.put('/updateItem/:id',updateItem)
router.get('/getItem/:id',getItem)
  

module.exports = router;