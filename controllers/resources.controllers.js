import { isValidObjectId } from "mongoose"
import mongoose from "mongoose"
import {Resource} from "../models/resources.models.js"
import {error} from  "../utils/error.js"


    

const createResource = async(resource_id)=>{
        
    if(typeof(resource_id)!= 'string') // type must always be in string
    {
        
        throw new error("Please enter a valid string as resource_id");
    }
    else
    {
        const newResource = await Resource.create({
            resource_id :resource_id,
        })
        
        if(!newResource)
        {
            throw new error("New Resource creation failed");
        }
        const newResourceobjectIdString = newResource._id.toString();
        return(newResourceobjectIdString);
    }

}
// }
// else{
//     throw new error("Connection not established")
// }
const getResource = async(resourceobjectIdString)=>{

     if(!isValidObjectId(resourceobjectIdString))
     {
        throw new error("Please provide a valid MongoDB Object ID")
     }
    const requiredResource = await Resource.findById(resourceobjectIdString);
    if(!requiredResource)
    {
        throw new error("Resource not found");
    }
    
    return(requiredResource.resource_id);
}
// const updateResource = async(resourceobjectIdString , newresource_id)=>{
//     if(!isValidObjectId(resourceobjectIdString))
//     {
//        throw new error("Please provide a valid MongoDB Object ID")
//     }
//     const resourcetobeUpdated = await Resource.findById(resourceobjectIdString);
//     if(!resourcetobeUpdated)
//     {
//         throw new error("Resource not found");
//     }
//     else
//     {
//         resourcetobeUpdated.user_id = newresource_id;
//         const updatedResource = await resourcetobeUpdated.save();
//         console.log("Resource updation successful")
//         return(updatedResource);
//     }
     
// }
const deleteResource= async(resourceobjectIdString)=>
        
{

    if(!isValidObjectId(resourceobjectIdString))
    {
       throw new error("Please provide a valid MongoDB Object ID")
    }
    const resourcetoBeDeleted = await Resource.findByIdAndDelete(resourceobjectIdString);
      if(!resourcetoBeDeleted)
      {
        throw new error("User not found");
      }
      console.log("Resource deletion successful");
}

export{createResource, getResource, deleteResource };
