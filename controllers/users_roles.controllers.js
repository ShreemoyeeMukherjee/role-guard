import mongoose from "mongoose"
import {User_role} from "../models/user_roles.models.js"
import { isValidObjectId } from "mongoose"
import {User} from "../models/users.models.js"
import {error} from "../utils/error.js"
import { getValidObjectId } from "../utils/getObjectId.js"
import {Key} from "../models/keys.models.js"
const createUserRole = async(key, user_id, role_id)=>{
    const existingKey = await Key.findOne({key:key});
    if(!existingKey)
    {
        throw new error("Key not found");
    }
    const createduserRole = await User_role.create({
        key:key,
        user_id:user_id,
        role_id:role_id,
    })
    if(createduserRole)
        {
            throw new error("User role creation failed");
        }
    return("User role created successfully");
}
const get_all_roles_for_user = async(key , user_id)=>
{
    const existingKey = await Key.findOne({key:key});
    if(!existingKey)
    {
        throw new error("Key not found");
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
            }
        }
        
    ])
    return(roles_for_user);
}
const  get_all_users_for_role = async(key, role_id)=>{
    const existingKey = await Key.findOne({key:key});
    if(!existingKey)
    {
        throw new error("Key not found");
    }
    const users_for_role = await User_role.aggregate([
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
            lookup:{
                from:"users",
                localField:"user_id",
                foreignField:"user_id",
                as:"user_details",
            }
        },
        {
            $unwind:{
                path:"$user_details"
            }
        },
        {
            $project:{
                role_id:1,
                user_id:1,
                user_details:1,
            }
        }
    ])
    return(users_for_role);
}
const deleteUser_role = async(key , user_id, role_id)=>{
    const existingKey = await Key.findOne({key:key});
    if(!existingKey)
    {
        throw new error("Key not found");
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
    return("User deletetion successful");

}
export{createUserRole,get_all_roles_for_user,get_all_users_for_role,deleteUser_role };









    




