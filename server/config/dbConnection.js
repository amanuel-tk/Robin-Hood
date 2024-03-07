const mongoose = require('mongoose');
require('dotenv').config();

// Retrieve MongoDB connection URI from environment variables
const uri = process.env.ATLAS_URI;

// Asynchronous function to connect to MongoDB database
const connectionDB = async () => {
    try {
        // Connect to MongoDB using the URI
        const conn= await mongoose.connect(uri);
       
        // Log successful connection
        console.log(`db connection successfully ${conn.connection.host}`);
      
    }catch(error){
        // Log error and exit process if connection fails
        console.log(error)
        process.exit(1)
    }
   
}

// Export connectDB function to be used in other files
module.exports=connectionDB