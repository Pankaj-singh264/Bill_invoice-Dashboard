const mongoose = require('mongoose')


const connectToDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`||'mongodb://localhost:27017/NewBillingSystem');
        console.log("Connected to MongoDB!");
    } catch (err) {
        console.error("Connection error:", err);
    }
};

module.exports = connectToDB;