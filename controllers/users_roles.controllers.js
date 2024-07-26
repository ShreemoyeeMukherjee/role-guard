import mongoose from "mongoose"
import {User_role} from "../models/user_roles.models.js"
import { isValidObjectId } from "mongoose"
import {User} from "../models/users.models.js"
import {error} from "../utils/error.js"

import {Key} from "../models/keys.models.js"
import {Role} from "../models/roles.models.js"

import { validateKey } from "../utils/keyValidation.js"
// the key is to be verified in all cases
// the user of this package may store the key in a seperate variable for ease of use
const createUserRole = async(key, user_id, role_id)=>{
    const result = validateKey(key);

    if(result == false)
        {
            throw new error("Invalid key");
        }
    if(!user_id)
        {
            throw new error("Please provide user id")
        }
        if(!role_id)
            {
                throw new error("Please provide role id")
            }
    if((typeof(user_id)!= "string") ||(typeof(role_id)!= "string"))
        {
            throw new error("Please provide user_id and role_id as string")
        }
    // check whether the  particular user or role exists in the database or not
    const user = await User.findOne({
        $and:[
            {key:key},
            {user_id:user_id}
        ]
    })
    
    if(!user)
        {
            throw new error("User doesnot exists")
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
    const createduserRole = await User_role.create({
        key:key,
        user_id:user_id,
        role_id:role_id,
    })
    if(!createduserRole)
        {
            throw new error("User role creation failed");
        }
    return("User role created successfully");
}
// retrieves all roles for a particular user
const get_all_roles_for_user = async(key , user_id)=>
{
    const result = validateKey(key);

    if(result == false)
        {
            throw new error("Invalid key");
        }
    if(!user_id)
        {
            throw new error("Please provide user id")
        }
   
    if(typeof(user_id)!= "string")
        {
            throw new error("Please provide user_id as string")
        }
    const roles_for_user = await User_role.aggregate([
        {
            $match:{
                key:key,
            }
        },
        {
              $match:{
                user_id:user_id,
              }
        },
        {
            $project:{
                user_id:1,
                role_id:1,
                _id:0,
            }
        }
        
    ])
    return(roles_for_user);
}
// retrieves all users for a particular user
const  get_all_users_for_role = async(key, role_id)=>{

    const result = validateKey(key);

    if(result == false)
        {
            throw new error("Invalid key");
        }
   
        if(!role_id)
            {
                throw new error("Please provide role id")
            }
    if(typeof(role_id)!= "string") 
        {
            throw new error("Please provide  role_id as string")
        }
    const users_for_role = await User_role.aggregate([
        
        [
            {
              $match:{
               key:key,
              }
            },
            {
              $match:{
                role_id:role_id,
              }
            },
            
            {
              $lookup:{
                from:"users",
                localField:"user_id",
                foreignField :"user_id",
                as:"user_details"
              }
            },
            
            {
              $unwind:{
                path:"$user_details"
                
              }
            },
            {
              $match:{
                "user_details.key":key,
              }
            },
            {
              $project:{
                role_id:1,
                user_id:1,
                "user_details.isSuspended":1,
                _id:0,
              }
            }
              
          ]
    ])
    return(users_for_role);
}
const deleteUserRole = async(key , user_id, role_id)=>{
    const result = validateKey(key);

    if(result == false)
        {
            throw new error("Invalid key");
        }
    if(!user_id)
        {
            throw new error("Please provide user id")
        }
    if(!role_id)
            {
                throw new error("Please provide role id")
            }
   
    if((typeof(user_id)!= "string") ||(typeof(role_id)!= "string"))
        {
            throw new error("Please provide user_id and role_id as string")
        }
    const deleteduser_role = await User_role.deleteOne({
        key:key,
        user_id:user_id,
        role_id:role_id,
    })
    if(!deleteduser_role)
        {
           throw new error("User role deleted succesfully ")  
        }
    return("User deletion successful");

}
export{createUserRole,get_all_roles_for_user,get_all_users_for_role,deleteUserRole };









    




