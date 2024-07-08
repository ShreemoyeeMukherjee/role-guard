import mongoose from "mongoose";
import { isValidObjectId } from "mongoose";
import {Permission} from "../models/permissions.models.js"
import {error} from "../utils/error.js"
import { isValidTime } from "../utils/isValidTime.js";
import {Key} from "../models/keys.models.js"
import {Role} from "../models/roles.models.js"
import{Resource} from "../models/resources.models.js"
import { validateKey } from "../utils/keyValidation.js";

const  createPermission = async(key,creationObject)=>{
    
    const result = validateKey(key);

    if(result == false)
        {
            throw new error("Invalid key");
        }
    if(!permission_id)
        {
            throw new error("Please provide permission id")
        }
    const permission_id = creationObject.permission_id;
    const days = creationObject.days;
    const start_time = creationObject.start_time;
    const end_time = creationObject.end_time;
    const maxduration = creationObject.maxduration;
     const role_id = creationObject.role;
     const resource_id= creationObject.resource

    if(! permission_id ||  !days || !start_time || !end_time|| !role_id||!resource_id)
    {
        throw new error("Please provide permission id , days , start_time ,end_time,role_id,resource_id")
    }
    if(typeof(permission_id) !=  "string")
    {
        throw new error("Please provide a valid string");
    }
    if(days)
    {
      if(days.length != 7)
      {
        throw new error("Please provide a days array of size 7")
      }
      const firstElement = days[0];
      // since array contains elements of same type , checking first 
      // element would suffice
      if(typeof(firstElement)  != 'boolean') 
      {
        throw new error("Please provide an boolean array")
      }
    }
    if(!isValidTime(start_time, end_time))
    {
        throw new error("Please enter  valid start and end_time")
    }
    // check whether the  particular resource or role exists in the database or not
    const resource = await Resource.findOne({
        $and:[
            {key:key},
            {resource_id:resource_id}
        ]
    })
    if(!resource)
        {
            throw new error("User doesnot exist");
        }
    const role = await Role.findOne({
            $and:[
                {key:key},
                {role_id:role_id}
            ]
        })
        if(!role)
            {
                throw new error("Role doesnot exist");
            }

    
    
    const newPermission = await Permission.create({
        permission_id :permission_id,
        days:days,
        start_time:start_time,
        end_time:end_time,
        role_id:role_id,
        resource_id:resource_id,

    })
    if(!newPermission)
    {
        throw new error("Permission is not created");
    }
    newPermission._id = undefined;
    return(newPermission);


}
const getPermission = async(key,permission_id)=>{
    const result = validateKey(key);

    if(result == false)
        {
            throw new error("Invalid key");
        }
    if(!permission_id)
        {
            throw new error("Please provide permission id")
        }
    if(typeof(permission_id)!= string)
    {
        throw new error("Please provide permission id as string")
    }
    const requiredPermission = await Permission.findOne(
        {
            $and:[
                {key:key},
                {permission_id:permission_id},
            ]
        }
    );
    if(!requiredPermission)
    {
        throw new error("Permission not found");
    }
    requiredPermission._id=  undefined;
    return(requiredPermission);

}
const updatePermission = async(key,permission_id,updationObject)=>{
   
    
    
    const result = validateKey(key);

    if(result == false)
        {
            throw new error("Invalid key");
        }
    if(!permission_id)
        {
            throw new error("Please provide permission id")
        }
    if(typeof(permission_id)!= string)
    {
        throw new error("Please provide permission id as string")
    }
    const permissionToBeUpdated  = await Permission.findOne({
        $and:[
            {key:key},
            {permission_id:permission_id},
        ]
    })
    if(!permissionToBeUpdated)
        {
            throw new error("Permission not found");
        }
    const days = updationObject.days;
    const start_time = updationObject.start_time;
    const end_time = updationObject.end_time;
    const role_id = updationObject.role_id;
    const resource_id = updationObject.resource_id;
   
    if(days)
    {
        if(days.length != 7)
        {
            throw new error("Please provide an array of length 7")
        }
        const firstElement = days[0];
        if(typeof(firstElement) != 'boolean')
        {
            throw new error("Please provide an boolean array")
        }
        permissionToBeUpdated.days = days;
    }
    // both are to be updated
    if(start_time && end_time)
    {
        if(!isValidTime(start_time ,end_time))
        {
            throw new error("Please provide valid start_time , end_time");
        }
        permissionToBeUpdated.start_time =  start_time;
        permissionToBeUpdated.end_time = end_time;
    }
    // the next two if conditions is for any one of them is to be updated
    // in that case the other one is to be retreived and the validity is to be 
    // checked
    if(start_time)
    {
        const saved_end_time = permissionToBeUpdated.end_time;
        if(!isValidTime(start_time , saved_end_time))
        {
            throw new error("Please provide valid start_time ")
        }
        permissionToBeUpdated.start_time = start_time;
    }
    if(end_time)
    {
        const saved_start_time = permissionToBeUpdated.start_time;
        if(!isValidTime(saved_start_time , end_time))
        {
            throw new error("Please provide valid end_time ")
        }
        permissionToBeUpdated.end_time = end_time;
    }
    // for role_id and resource_id we first check whether the input is valid or not
    // then we check a particular role or resource exists in our database or not
    //only if all consditons are satisfied, updation is allowed
  if(role_id)
    {
        if(typeof(role_id)!=string)
            {
                throw new error("Please provide role_id as string")
            }
        const role = await Role.findOne({
            $and:[
                {key:key},
                {role_id:role_id},
            ]
        })
        if(!role)
            {
                throw new error("Role not found ")
            }
            permissionToBeUpdated.role_id=  role_id;
    }
    if(resource_id)
        {
            if(typeof(resource_id)!=string)
                {
                    throw new error("Please provide role_id as string")
                }
            const resource = await Resource.findOne({
                $and:[
                    {key:key},
                    {resource_id:resource_id},
                ]
            })
            if(!resource)
                {
                    throw new error("Resource not found ")
                }
                permissionToBeUpdated.resource_id= resource_id;
        }
    
    const updatedPermission = await permissionToBeUpdated.save();
    console.log("Permission updation successful")
    
    return(updatedPermission);
}
const deletePermission = async(key , permission_id)=>
        
{
    const result = validateKey(key);

    if(result == false)
        {
            throw new error("Invalid key");
        }
    if(!permission_id)
        {
            throw new error("Please provide permission id")
        }
    const existingKey = await Key.findOne({key:key});
    
    if(!existingKey)
        {
            throw new error("Key not found")
        }
    const permissiontoBeDeleted = await Permission.deleteOne({key:key,permission_id:permission_id});
      if(!permissiontoBeDeleted)
      {
        throw new error("Permission not found");
      }
      console.log("Permission deletion successful");
}


export{createPermission,getPermission,updatePermission,deletePermission};