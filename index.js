
import mongoose from "mongoose"
import {connectDB} from "./db/index.js"
import{createUser , getUser,updateUser,deleteUser} from "../package/controllers/users.controllers.js"
import {createRole , getRole , updateRole , deleteRole} from "../package/controllers/roles.controllers.js"
import{createResource, getResource,updateResource, deleteResource } from "../package/controllers/resources.controllers.js"
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


export{createUser ,getUser,updateUser,deleteUser};
export{createRole,getRole,updateRole,deleteRole};
export{createResource, getResource,updateResource, deleteResource };















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