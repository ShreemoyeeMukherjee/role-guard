import mongoose from "mongoose";
import { Unauthorizedaccess } from "../models/unauthorized_access.models.js";
import { validateKey } from "../utils/keyValidation.js";
import { error } from "../utils/error.js";
import { User } from "../models/users.models.js";
// this function returns all unauthorized activities(access) pf an user within
//3 months
const getUnauthorizedActivityofUser = async(key,user_id)=>{
    const result = validateKey(key);
    if(result == false)
        {
            throw new error("Invalid key");
        }
    if(!user_id)
        {
            throw new error("Please provide user id");
        }
        if(typeof(user_id)!= "string")
            {
                throw new error("Please provide user_id as string")
            }
       const existingUser =  await User.findOne({
        $and:[
            {key:key},
            {user_id:user_id},
        ]
       })
       // if user_id is invalid there is no point in checking further
       if(!existingUser)
        {
            throw new error("User not found");
        }
        const all_unauthorized_activities = await Unauthorizedaccess.aggregate([
            {
                $match:{
                    key:key,
                },

            },
            {
                $match:{
                    user_id:user_id,
                }
            },
            {
                $lookup:{
                    from:"users",
                    localField:"user_id",
                    foreignField:"user_id",
                    as:"user_details",
                }
            },
        
            {
                $unwind:{
                    path:"$user_details",
                }
            },
            {
                $match:{
                    "user_details.key":key,
                }
            },
            {
                $project:{
                    _id:0,
                    key:1,
                    resource_id:1,
                    count:1,
                    user_id:1,
                    "user_details.isSuspended":1,
                    // the timezone used here is Universal Coordinated Timezone (UTC)
                    lastAccessedAt:{$dateToString:{format:"%Y-%m-%d %H:%M:%S",date:"$lastAccessedTime"}}


                }
            }


        ])
        return(all_unauthorized_activities);
    
}
export{getUnauthorizedActivityofUser};