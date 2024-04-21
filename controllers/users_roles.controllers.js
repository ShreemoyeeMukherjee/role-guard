import mongoose from "mongoose"
import User_role from "../models/user_roles.models.js"
import { isValidObjectId } from "mongoose"
import {error} from "../utils/error.js"
const createUserRole = async(userId, roleId)=>{
    if(!userId || !roleId)
    {
        throw new error("Please provide userId and roleId");
    }
    if(!typeof(userId) == 'string')
    {
        throw new error("Please provide a valid userId");
    }
    if(!typeof(roleId) == 'string')
    {
        throw new error("Please provide a valid roleId");
    }
    const newUserRole  = await User_role({
        user:userId,
        role:roleId,
    })
    if(!newUserRole)
    {
        throw new error("User role not created")
    }
    return(newUserRole._id);
}
const updateUserRole = async(userroleObjectIdString ,updationObject)=>{
    if(!isValidObjectId)
    {
        throw new error("Please provide a valid  objectId string")
    }
    const userRoleToBeUpdated = await User_role.findById(userroleObjectIdString);
    if(!userRoleToBeUpdated)
    {
        throw new error("User_role not found")
    }
    const user = updationObject.user;
    const role = updationObject.role;
    if(user)
    {
        userRoleToBeUpdated.user   = user;
    }
    if(role)
    {
        userRoleToBeUpdated.role  = role;
    }
    const updatedRole = await userRoleToBeUpdated.save();
    return(updatedRole);





}
const deleteUser_role   = async(userroleObjectIdString)=>{
    if(!isValidObjectId(userroleObjectIdString))
    {
       throw new error("Please provide a valid MongoDB Object ID");
    }
    const userroletoBeDeleted = await User_role.findByIdAndDelete(userroleObjectIdString);
      if(!userroletoBeDeleted)
      {
        throw new error("User not found");
      }
      console.log("User deletion successful");
}
export{createUserRole,updateUserRole,deleteUser_role};