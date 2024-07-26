
import mongoose from "mongoose"
import {Resource} from "../models/resources.models.js"
import {error} from  "../utils/error.js"

import { validateKey } from "../utils/keyValidation.js"


//this particular controller handles creation , deletion , retrieval of resource
// Updation not required as only resource_id is stored  


const createResource = async(key ,resource_id)=>{
        const result = validateKey(key);
        if(result == false)
            {
                throw new error("Invalid Key")
            }
        if(!resource_id)
        {
            throw new error("Please provide resource_id")
        }

        if(typeof(resource_id)!= "string")
            {
                throw new error("Please provide resource id as string")
            }
    const createdresource = await Resource.create({
        key:key,
        resource_id:resource_id,

    })
    if(!createdresource)
        {
            throw new error("Resource creation failed")
        }
    return("Resource creation successful")

        
    

}

const getResource = async(key, resource_id)=>{
    const result = validateKey(key);
    if(result == false)
        {
            throw new error("Invalid Key")
        }
    if(!resource_id)
    {
        throw new error("Please provide resource_id")
    }
    if(typeof(resource_id)!= "string")
        {
            throw new error("Please provide resource id as string")
        }
    const requiredResource = await Resource.findOne({
        $and:[
            {key:key},
            {resource_id:resource_id},
        ]
    },{_id:0})// the mongodb object id of this document is irrelevant to 
    // the user , hence it is excluded
    if(!requiredResource)
    {
        throw new error("Resource not found");
    }
    
    return(requiredResource);
     
}

const deleteResource= async(key, resource_id)=>
        
{
    const result = validateKey(key);
    if(result == false)
        {
            throw new error("Invalid Key")
        }
    if(!resource_id)
    {
        throw new error("Please provide resource_id")
    }

     
     
     
    
        if(typeof(resource_id)!= "string")
            {
                throw new error("Please provide resource id as string")
            }
    const deletedResource = await  Resource.deleteOne({key:key , resource_id:resource_id});
    if(!deletedResource)
        {
            throw new error("Resource Deletion failed");
        }
    return("Resource Deletion successfully")
}

export{createResource, getResource, deleteResource };
