// CommonJS syntax
import mongoose from "mongoose"
import {connectDB} from "./db/index.js"
import dotenv from "dotenv"
dotenv.config();

connectDB()
.then(()=>
{
   console.log("Connection established");
   
   
})
.catch((err)=>
{
  console.log(err);
})
export{a};




// import {a} from "../package/db/index.js"
// export{a};