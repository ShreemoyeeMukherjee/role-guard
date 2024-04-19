import mongoose from 'mongoose'
import {DB_NAME} from '../constants.js'

import {MONGODB_URI} from "../env.sample.js"
import dotenv from 'dotenv'
dotenv.config();
const connectDB = async()=>{
    
    try{
        
        const connectionInstance = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);
        //const connectedDBName = connectionInstance.connections[0].name;
        //console.log(`MongoDB connection successful. Connected to database: ${connectedDBName}`);
        //console.log(`MongoDB connection successful . DB host ${connectionInstance.connection.host}`);
    }
    catch(err)
    {
        console.log(err);
        process.exit(1);
    }
    
}

export{connectDB};




// import dotenv from "dotenv";
// import mongoose from "mongoose";
// dotenv.config();
// console.log(process.env.m);
// const a = 10;
// export { a };


