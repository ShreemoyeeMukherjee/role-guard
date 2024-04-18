// CommonJS syntax
import mongoose from "mongoose"
import {connectDB} from "./db/index.js"
import dotenv from "dotenv"
dotenv.config();
var a = 1;
connectDB()
.then(()=>
{
   a = 5;
   
   
})
.catch((err)=>
{
  console.log(err);
})
export{a};




// import {a} from "../package/db/index.js"
// export{a};