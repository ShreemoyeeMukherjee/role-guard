import mongoose from "mongoose"
import { validateKey } from "../utils/keyValidation.js" 
import {Permission} from "../models/permissions.models.js"
import { Unauthorizedaccess } from "../models/unauthorized_access.models.js"
import { error } from "../utils/error.js"
import { Resource } from "../models/resources.models.js"
import { User } from "../models/users.models.js"
import { getDate } from "../utils/getDate.js"
import { notifyUser } from "../utils/notify.js"
const canAccess = async(key, user_id,resource_id)=>{
    const result = validateKey(key);
    if(result == false)
        {
            throw new error("Invalid string");
        }
    if(!user_id)
        {
            throw new error("Please provide user_id");
        }
    if(!resource_id)
        {
            throw new error("Please provide resource_id");
        }
    if(typeof(user_id) != String)
        {
            throw new error("Please provide user_id as string")
        }
    if(typeof(resource_id)!= string)
        {
            throw new error("Please provide role_id as string")
        }
    const resource = await Resource.findOne({
        $and:[
            {key:key},
            {resource_id :resource_id},
        ]
    })
    // the below steps are required because if user_id or resource_id is incorrect 
    // the match stage will not provide with any documents
    // we may end up logging this entry as unauthorized access

    if(!resource)
        {
            throw new error("Resource not found")
        }
    const user  = await User.findOne({
        $and:[
            {key:key},
            {resource_id:resource_id}
        ]
    })
    if(!user)
        {
            throw new error("User not found")
        }
    const authorizedusers  = await Permission.aggregate(
        [
            {
               $match:{
                key:key,
               }
            },
        {
        $match:{
            resource_id:resource_id,
        }
    },
        {
            $lookup:{
                from:"user_roles",
                localField:"role_id",
                foreignField:"role_id",
                as:"allowed_users"
            }
        },
        {
            $unwind:{
                path:"$allowed_users",
            }
        },
        {
            $match:{
                "$allowed_users.user_id"  :user_id,
            }
        },
        {
            $lookup:{
                from :"users",
                localField:"allowed_users.user_id",
                foreignField:"user_id",
                as:"user_details"

            }
        },
        {
            $unwind:{
                "path":"user_details"
            }
        },
        {
            $match:{
                "user_details.isSuspended":false,
            }
        },
        
    ])
    const n = authorizedusers.length();
    const current_date = Date.now();
     let c = 0;
     let allowed_duration = 0;
     // there can be more than 1 document if an user has multiple roles
     // for allowed_duration we take maximum_duration of all 
    for(i = 0;i<n;i++)
        {
               const result_object = authorizedusers[i];
               const start_time = result_object.start_time;
               const end_time = result_object.end_time;
               const start_date = getDate(start_time);
               const end_date = getDate(end_time);
               if(current_date>=start_date && current_date<end_date)
                {
                    c++;
                    allowed_duration = max(allowed_duration,result_object.max_duration)
                }

        }
    if(c!= 0) // atleast a single document is found
        {
            
            const message = await notifyUser(user_id,resource_id, allowed_duration);
            return(message);
            
              
        }
        else // user not allowed;
    {
           const message  = "Access denied";
           const existing_log = await Unauthorizedaccess.findOne({
            $and:[
                {key:key},
                {user_id:user_id},
                {resource_id:resource_id}
            ]
           })
           if(existing_log)
            {
                let count = existing_log.count;
                count = count+1;
                existing_log.count = count;
                existing_log.lastUpdationTime = current_date;
                const updated_log = await existing_log.save();
            }
            else{
           const new_log = await Unauthorizedaccess.create({
              key:key,
               user_id:user_id,
               resource_id:resource_id,
               count:1,
               lastUpdationTime:current_date,
               
           })
           return(message);
        }
    }

}
export{canAccess}
