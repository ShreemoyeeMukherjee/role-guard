import { isValidObjectId } from "mongoose"
import mongoose from "mongoose"
import {Role} from "../models/roles.models.js"
import {error} from  "../utils/error.js"
import {Key} from "../models/keys.models.js"


  // this particular controller handles creation , deletion , retrieval of roles
  // Updation not required as only role_id is stored  

const createRole = async(key, role_id)=>{
        
    const existingKey = await Key.findOne({key:key});
      if(!existingKey)
        {
            throw new error("Key doesnot exist");
        }
        if(typeof(role_id)!= string)
            {
                throw new error("Please provide role id as string")
            }
        
   
    
        const newRole = await User.create({
            key:key,
            role_id :role_id,
           
        })
        //console.log(newUser);
        if(!newRole)
        {
            throw new error("New role creation failed");
        }
        return("Role created successfully");

}

const getRole = async(key, role_id)=>{

    const existingKey = await Key.findOne({key:key});
    if(!existingKey)
    {
        throw new error("Key not found")
    }
    if(typeof(role_id)!= string)
        {
            throw new error("Please provide role id as string")
        }
    const requiredRole = await Role.findOne({
        $and:[
            {key:key},
            {role_id:role_id},
        ]
    })
    if(!requiredRole)
    {
        throw new error("Role not found");
    }
    requiredRole._id = undefined;
    return(requiredRole);
}

const deleteRole = async(roleobjectIdString)=>
        
{


    if(!isValidObjectId(roleobjectIdString))
    {
       throw new error("Please provide a valid MongoDB Object ID")
    }
    if(typeof(role_id)!= string)
        {
            throw new error("Please provide role id as string")
        }
    const roletoBeDeleted = await Role.findByIdAndDelete(roleobjectIdString);
      if(!roletoBeDeleted)
      {
        throw new error("Role not found");
      }
      console.log("Role deletion successful");
}

export{createRole, getRole, deleteRole };
