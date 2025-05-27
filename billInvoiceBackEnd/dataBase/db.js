const mongoose = require('mongoose');
const connectToDB = async () => {
    try {
        // const mongoURI = process.env.MONGODB_URI ;
        
        // 'mongodb: //username:password@hostname:port/database?ssl=true&replicaSet=myReplicaSet''
        const mongoURI = 'mongodb+srv://Pankaj:12121212@cluster0.x4yeanv.mongodb.net/'
        await mongoose.connect(mongoURI, {
          
        });
        console.log("Connected to MongoDB!");
    } catch (err) {
        //console.error("Connection error:", err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectToDB;