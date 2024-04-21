
import mongoose from "mongoose"
import {connectDB} from "./db/index.js"
import{createUser , getUser,deleteUser} from "../package/controllers/users.controllers.js"
import {createRole , getRole , deleteRole} from "../package/controllers/roles.controllers.js"
import{createResource, getResource, deleteResource } from "../package/controllers/resources.controllers.js"
import{createPermission, getPermission,deletePermission} from "../package/controllers/permissions.controllers.js"
import{createUserRole,delete_all_roles_for_users,delete_all_users_for_roles,delete_all_users_roles} from "../package/controllers/users_roles.controllers.js"
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


export{createUser ,getUser,deleteUser};
export{createRole,getRole,deleteRole};
export{createResource, getResource,deleteResource };
export{createPermission, getPermission, deletePermission};
export{createUserRole,delete_all_roles_for_users,delete_all_users_for_roles,delete_all_users_roles}















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