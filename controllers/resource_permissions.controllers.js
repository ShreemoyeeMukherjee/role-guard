import mongoose from "mongoose"
import Resource_permission from "../models/user_roles.models.js"
import { isValidObjectId } from "mongoose"
import {error} from "../utils/error.js"
const createResourcePermission = async(resourceId, permissionId)=>{
    const newResourcePermission  = await Resource_permission({
        resource:resourceId,
        permission:permissionId,
    })
    if(!newResourcePermission)
    {
        throw new error("Resource Permission not created")
    }
    return(newResourcePermission._id);
}
const updateResourcePermission = async(resourcepermissionObjectIdString ,updationObject)=>{
    if(!isValidObjectId)
    {
        throw new error("Please provide a valid  objectId string")
    }
    const resourcepermissionToBeUpdated = await Resource_permission.findById(resourcepermissionObjectIdString);
    if(!resourcepermissionToBeUpdated)
    {
        throw new error("Resource_permission not found")
    }
    const resource = updationObject.resource;
    const permission = updationObject.permission;
    if(resource)
    {
        userRoleToBeUpdated.resource   = resource;
    }
    if(permission)
    {
        userRoleToBeUpdated.permission  = permission;
    }
    const updatedresourcePermission = await resourcepermissionToBeUpdated.save();
    return(updatedresourcePermission);





}
const deleteResource_permission   = async(resourcepermissionObjectIdString)=>{
    if(!isValidObjectId(resourcepermissionObjectIdString))
    {
       throw new error("Please provide a valid MongoDB Object ID");
    }
    const resourcepermissiontoBeDeleted = await Resource_permission.findByIdAndDelete(resourcepermissionObjectIdString);
      if(!resourcepermissiontoBeDeleted)
      {
        throw new error("Resource Permission not found");
      }
      console.log("Resource Permission deletion successful");
}
export{createResourcePermission,updateResourcePermission,deleteResource_permission};