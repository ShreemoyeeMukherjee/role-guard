import { isValidObjectId } from "mongoose"
import mongoose from "mongoose"
import {Role} from "../models/roles.models.js"
import {error} from  "../utils/error.js"


    

const createRole = async(role_id)=>{
        
    if(typeof(role_id)!= 'string') // type must always be in string
    {
        
        throw new error("Please enter a valid string as role_id");
    }
    else
    {
        const newRole = await Role.create({
            role_id :role_id,
        })
        
        if(!newRole)
        {
            throw new error("New Role creation failed");
        }
        const newRoleobjectIdString = newRole._id.toString();
        return(newRoleobjectIdString);
    }

}

const getRole = async(roleobjectIdString)=>{

     if(!isValidObjectId(roleobjectIdString))
     {
        throw new error("Please provide a valid MongoDB Object ID")
     }
    const requiredRole = await Role.findById(roleobjectIdString);
    if(!requiredRole)
    {
        throw new error("Role not found");
    }
    
    return(requiredRole.role_id);
}
const updateRole = async(roleobjectIdString , newrole_id)=>{
    if(!isValidObjectId(roleobjectIdString))
    {
       throw new error("Please provide a valid MongoDB Object ID")
    }
    const roletobeUpdated = await Role.findById(roleobjectIdString);
    if(!roletobeUpdated)
    {
        throw new error("Role not found");
    }
    else
    {
        roletobeUpdated.role_id = newrole_id;
        const updatedRole = await roletobeUpdated.save();
        console.log("Role updation successful");
        return(updateRole);
    }
     
}
const deleteRole = async(roleobjectIdString)=>
        
{

    if(!isValidObjectId(roleobjectIdString))
    {
       throw new error("Please provide a valid MongoDB Object ID")
    }
    const roletoBeDeleted = await Role.findByIdAndDelete(roleobjectIdString);
      if(!roletoBeDeleted)
      {
        throw new error("Role not found");
      }
      console.log("Role deletion successful");
}

export{createRole, getRole,updateRole, deleteRole };
