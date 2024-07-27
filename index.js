
import mongoose from "mongoose"
import {connectDB} from "./db/index.js"
import{createUser , getUser,deleteUser,suspendUser, unsuspendUser} from "../package/controllers/users.controllers.js"
import {createRole , getRole , deleteRole} from "../package/controllers/roles.controllers.js"
import{createResource, getResource, deleteResource } from "../package/controllers/resources.controllers.js"
import{createPermission, getPermission,deletePermission,updatePermission} from "../package/controllers/permissions.controllers.js"
import{createUserRole,get_all_roles_for_user,get_all_users_for_role,deleteUserRole} from "../package/controllers/users_roles.controllers.js"
import { createKey ,deleteKey} from "./controllers/keys.controllers.js"

import {error} from "../package/utils/error.js"
import { canAccess } from "./controllers/access.controllers.js"
import { getUnauthorizedActivityofUser } from "./controllers/unauthorized_activity.controllers.js"


try{
  await connectDB();
  //console.log("Connection established");
  
}


catch(err)
{
    throw new error("Database connection failed");
}

export{createKey,deleteKey};
export{createUser ,getUser,deleteUser, suspendUser,unsuspendUser};
export{createRole,getRole,deleteRole};
export{createResource, getResource,deleteResource };
export{createPermission, getPermission, deletePermission,updatePermission};
export{createUserRole,get_all_roles_for_user,get_all_users_for_role,deleteUserRole}
export{canAccess};
export{getUnauthorizedActivityofUser};














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