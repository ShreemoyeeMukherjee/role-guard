
import mongoose from "mongoose"
import {Role} from "../models/roles.models.js"
import {error} from  "../utils/error.js"

import { validateKey } from "../utils/keyValidation.js"


  // this particular controller handles creation , deletion , retrieval of roles
  // Updation not required as only role_id is stored  and is usually permanent

const createRole = async(key, role_id)=>{
        
      const result = validateKey(key);
      if(result == false)
        {
            throw new error("Invalid Key")
        }
        if(!role_id)
            {
                throw new error("Please provide role_id")
            }
        if(typeof(role_id)!= "string")
            {
                throw new error("Please provide role id as string")
            }
        
   
    
        const newRole = await Role.create({
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

    const result = validateKey(key);
      if(result == false)
        {
            throw new error("Invalid Key")
        }
        if(!role_id)
            {
                throw new error("Please provide role_id")
            }
    if(typeof(role_id)!= "string")
        {
            throw new error("Please provide role id as string")
        }
    const requiredRole = await Role.findOne({
        $and:[
            {key:key},
            {role_id:role_id},
        ]

    },{_id:0})// the mongodb object id of this document is irrelevant to 
              // the user , hence it is excluded
    if(!requiredRole)
    {
        throw new error("Role not found");
    }
    
    return(requiredRole);
}

const deleteRole = async(key,role_id)=>
        
{
    const result = validateKey(key);
    if(result == false)
      {
          throw new error("Invalid Key")
      }
      if(!role_id)
          {
              throw new error("Please provide role_id")
          }

    
    if(typeof(role_id)!= "string")
        {
            throw new error("Please provide role id as string")
        }
    const roletoBeDeleted = await Role.deleteOne({key:key,role_id:role_id});
      if(!roletoBeDeleted)
      {
        throw new error("Error in role deletion");
      }
      return("Role deletion successful");
}

export{createRole, getRole, deleteRole };
