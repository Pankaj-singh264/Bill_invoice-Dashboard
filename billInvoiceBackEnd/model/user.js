const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyEmail: {
        type: String,
        required: true,
        unique: true
    },
    companyPhone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gstin: {
        type: String,
        required: true
    }
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;