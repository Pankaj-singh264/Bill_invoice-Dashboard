const mongoose = require('mongoose')


const connectToDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/NewBillingSystem'|| process.env.MONGO_URI)
        console.log("Connected to MongoDB!")
    } catch (err) {
        console.error("Connection error:", err);
    }
};

module.exports = connectToDB;