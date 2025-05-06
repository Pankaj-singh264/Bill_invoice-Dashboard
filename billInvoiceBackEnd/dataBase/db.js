const mongoose = require('mongoose')


const connectToDB = async () => {
    try {
<<<<<<< HEAD
        await mongoose.connect(`${process.env.MONGO_URI}`);
=======
        await mongoose.connect(`mongodb://localhost:27017/newbill`);
>>>>>>> 381d956219014ba0118730d67358c36bf5ceb3a5
        console.log("Connected to MongoDB!");
    } catch (err) {
        console.error("Connection error:", err);
    }
};

module.exports = connectToDB;