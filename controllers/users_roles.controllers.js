import mongoose from "mongoose"
import {User_role} from "../models/user_roles.models.js"
import { isValidObjectId } from "mongoose"
import {error} from "../utils/error.js"
import { getValidObjectId } from "../utils/getObjectId.js"
const createUserRole = async(userobjectId, roleobjectId)=>{
    if(!userobjectId || !roleobjectId)
    {
        throw new error("Please provide both userobjectId and roleobjectId");
    }
     if(!isValidObjectId(userobjectId) || !isValidObjectId(roleobjectId))
     {
        throw new error("Please provide valid  userobjectId , roleobjectId")
     }
    const newUserRole  = await User_role.create({
        user:userobjectId,
        role:roleobjectId,
    })
    if(!newUserRole)
    {
        throw new error("User role not created")
    }
    return(newUserRole._id);
}







const delete_all_roles_for_users = async(rolesarray)=>{
    const rolesobjectidarray = [];
    var i = 0;
    for( i = 0;i<rolesarray.length;i++)
    {
        rolesobjectidarray.push(getValidObjectId(rolesarray[i]));

    }
    
    const deleted_roles  = await User_role.deleteMany(
        {
        "role":{$in:rolesobjectidarray}
        }
    )
    return(deleted_roles.deletedCount);
}
const delete_all_users_for_roles = async(usersarray)=>{
    const usersobjectidarray = [];
    var i = 0;
    for( i = 0;i<usersarray.length;i++)
    {
        usersobjectidarray.push(getValidObjectId(usersarray[i]));

    }
    const deleted_users  = await User_role.deleteMany(
        {
        
        "role":{$in:usersobjectidarray},
        }
    )
    return(deleted_users.deletedCount);
}

// const delete_all_users_roles = async(usersarray,rolesarray)=>{
//     const usersobjectidarray  = [];
//     const rolesobjectidarray =  [];
//     var i = 0;
//     for( i = 0;i<usersarray.length;i++)
//     {
//         usersobjectidarray.push(getValidObjectId(usersarray[i]));

//     }
//     for( i = 0;i<rolesarray.length;i++)
//     {
//         rolesobjectidarray.push(getValidObjectId(rolesarray[i]));


//     }
//     const deleted_users_roles = await User_role.deleteMany({
//         "role":{$in:usersobjectidarray},
//         "user":{$in:rolesobjectidarray}

//     })
//     return(deleted_users_roles.deletedCount);
// }
    const delete_user_role  = async(userobjectidstring , roleobjectidstring)=>{
        const userobjectid = getValidObjectId(userobjectidstring);
        const roleobjectid = getValidObjectId(roleobjectidstring);
        const delete_user_role = await User_role.deleteOne({
            user:userobjectidstring,
            role:roleobjectidstring,
        })
        if(!delete_user_role)
        {
            throw new error("User role deleted");
        }
        console.log("Deletion successful");
    }

    




export{createUserRole,delete_all_roles_for_users,delete_all_users_for_roles,delete_all_users_roles};