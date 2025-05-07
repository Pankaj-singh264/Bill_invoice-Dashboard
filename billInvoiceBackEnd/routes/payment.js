const express = require('express')
const router = express.Router()

const {Orders,verifyOrder} =require('../controllers/payment') 


router.get('/order',Orders)
router.get('/varify',verifyOrder)