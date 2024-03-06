const mongoose = require('mongoose');
require('dotenv').config();


const uri = process.env.ATLAS_URI;

const connectionDB = async () => {
    try {
        const conn= await mongoose.connect(uri);
       
        console.log(`db connection successfully ${conn.connection.host}`);
      
    }catch(error){
        console.log(error)
        process.exit(1)
    }
   
}

module.exports=connectionDB