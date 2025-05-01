const express = require('express');
const {
    protect
} = require('../middleware/userAuth');
const {
    createInvoice,
    getGSTSummary
} = require('../controllers/invoice');

const router = express.Router();

router.use(protect);

router.post('/', createInvoice);
router.get('/gst-summary', getGSTSummary);

module.exports = router;