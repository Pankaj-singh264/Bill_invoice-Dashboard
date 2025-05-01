const express = require('express');
const {
    registerUser,
    loginUser,
    logoutUser,
    getUser
} = require('../controllers/user');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout/:id', logoutUser);
router.get('/getUser/', getUser);

module.exports = router;