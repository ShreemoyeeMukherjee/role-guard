import mongoose from "mongoose";
import { isValidObjectId } from "mongoose";
import {Permission} from "../models/permissions.models.js"
import {error} from "../utils/error.js"
import { isValidTime } from "../utils/isValidTime.js";
const  createPermission = async(creationObject)=>{
    var final_exceptions_start_time = "";
    var final_exceptions_end_time = "";
    const permission_id = creationObject.permission_id;
    const days = creationObject.days;
    const start_time = creationObject.start_time;
    const end_time = creationObject.end_time;
    const exceptions_start_time = creationObject.start_time;
    const exceptions_end_time = creationObject.end_time;

    if(! permission_id ||  !days || !start_time || !end_time)
    {
        throw new error("Please provide permission id , days , start_time ,end_time")
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
      
      if(typeof(firstElement)  != 'boolean') 
      {
        throw new error("Please provide an boolean array")
      }
    }
    if(!isValidTime(start_time, end_time))
    {
        throw new error("Please enter  valid start and end_time")
    }
    if((exceptions_start_time && !exceptions_end_time) || (!exceptions_start_time && exceptions_end_time))
    {
        throw new error("Please enter both exceptions_start_time and exceptions_end_time")
    }
    if(!exceptions_start_time && !exceptions_end_time)
    {
         final_exceptions_start_time = start_time ;
        // lets this be the exceptiontime in case of no exception
        final_exceptions_end_time = end_time;
    }
    if(exceptions_start_time && exceptions_end_time)
    {
        if(!isValidTime(exceptions_start_time, exceptions_end_time))
    {
        throw new error("Please enter  valid  exceptions_start_time and exceptions_end_time")
    }
    final_exceptions_start_time = start_time ;
    
    final_exceptions_end_time = end_time;
    }

    
    
    const newPermission = await Permission.create({
        permission_id :permission_id,
        days:days,
        start_time:start_time,
        end_time:end_time,
        exceptions_start_time :final_exceptions_start_time,
        exceptions_end_time:final_exceptions_end_time

    })
    if(!newPermission)
    {
        throw new error("Permission is not created");
    }
    return(newPermission._id.toString());


}
const getPermission = async(permissionobjectIdString)=>{
    if(!isValidObjectId(permissionobjectIdString))
     {
        throw new error("Please provide a valid MongoDB Object ID")
     }
    const requiredPermission = await Permission.findById(permissionobjectIdString);
    if(!requiredPermission)
    {
        throw new error("User not found");
    }
    
    return(requiredPermission);

}
const updatePermission = async(permissionobjectIdString,updationObject)=>{
    if(!isValidObjectId(permissionobjectIdString))
    {
        throw new error("Please provide a valid objectid string")

    }
    const permissionToBeUpdated = await Permission.findById(permissionobjectIdString);
    const permission_id = updationObject.permission_id;
    const days = updationObject.days;
    const start_time = updationObject.start_time;
    const end_time = updationObject.end_time;
    const exceptions_start_time = updationObject.start_time;
    const exceptions_end_time = updationObject.end_time;
    if(!permissionToBeUpdated)
    {
        throw new error("Permission not found");
    }
    if(permission_id)
    {
        permissionToBeUpdated.permission_id = permission_id;

    }
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
    if(start_time && end_time)
    {
        if(!isValidTime(start_time ,end_time))
        {
            throw new error("Please provide valid start_time , end_time");
        }
        permissionToBeUpdated.start_time =  start_time;
        permissionToBeUpdated.end_time = end_time;
    }
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
    if(exceptions_start_time && exceptions_end_time)
    {
        if(!isValidTime(exceptions_start_time,exceptions_end_time))
        {
            throw new error("Please provide valid start_time , end_time");
        }
        permissionToBeUpdated.exceptions_start_time = exceptions_start_time;
        permissionToBeUpdated.exceptions_end_time = exceptions_end_time;
    }
    if(exceptions_start_time)
    {
        const saved_exceptions_end_time = permissionToBeUpdated.exceptions_end_time;
        if(!saved_exceptions_end_time)
        {
            throw new error("Please provide a exceptions_end_time as well")
        }
        if(!isValidTime(exceptions_start_time , saved_exceptions_end_time))
        {
            throw new error("Please provide valid end_time ")
        }
        permissionToBeUpdated.exceptions_start_time = exceptions_start_time;
    }
    if(exceptions_end_time)
    {
        const saved_exceptions_start_time = permissionToBeUpdated.exceptions_start_time;
        if(!saved_exceptions_start_time)
        {
            throw new error("Please provide a exceptions_start_time as well")
        }
        if(!isValidTime(saved_exceptions_start_time , exceptions_end_time))
        {
            throw new error("Please provide valid end_time ")
        }
        permissionToBeUpdated.exceptions_end_time = exceptions_end_time;
    }
    const updatedPermission = await permissionToBeUpdated.save();
    console.log("Permission updation successful")
    
    return(updatedPermission);
}
const deletePermission = async(permissionobjectIdString)=>
        
{

    if(!isValidObjectId(permissionobjectIdString))
    {
       throw new error("Please provide a valid MongoDB Object ID")
    }
    const permissiontoBeDeleted = await Permission.findByIdAndDelete(userobjectIdString);
      if(!permissiontoBeDeleted)
      {
        throw new error("User not found");
      }
      console.log("Permission deletion successful");
}


export{createPermission,getPermission,updatePermission,deletePermission};