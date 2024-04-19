
import mongoose from "mongoose"
import {connectDB} from "./db/index.js"
import{createUser , getUser,updateUser} from "../package/controllers/users.controllers.js"
import dotenv from "dotenv"
import {error} from "../package/utils/error.js"
dotenv.config();

try{
  await connectDB();
  //console.log("Connection established");
  
}


catch(err)
{
    throw new error("Database connection failed");
}


export{createUser ,getUser,updateUser};















// connectDB()
// .then(()=>
// {
//    console.log("Connection established");
   
   
// })
// .catch((err)=>
// {
//   console.log(err);
// })





// import {a} from "../package/db/index.js"
// export{a};