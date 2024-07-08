import { isValidObjectId } from "mongoose"
import mongoose from "mongoose"
import {User} from "../models/users.models.js"
import {Key} from "../models/keys.models.js"
import {error} from  "../utils/error.js"


    
// creating user 
const createUser = async(key , user_id)=>{
      const existingKey = await Key.findOne({key:key});
      if(!existingKey)
        {
            throw new error("Key doesnot exist");
        }
        if(typeof(user_id)!= string)
            {
                throw new error("Please provide user id as string")
            }
        
   
    
        const newUser = await User.create({
            key:key,
            user_id :user_id,
            isSuspended:false,
        })
        //console.log(newUser);
        if(!newUser)
        {
            throw new error("New user creation failed");
        }
        return("User created successfully");
    

}
// updation not required because usually user_id is permanent
const getUser = async(key ,user_id)=>{

    const existingKey = await Key.findOne({key:key});
    if(!existingKey)
    {
        throw new error("Key not found")
    }
    if(typeof(user_id)!= string)
        {
            throw new error("Please provide user id as string")
        }
    const requiredUser = await User.findOne({
        $and:[
            {key:key},
            {user_id:user_id},
        ]
    })
    if(!requiredUser)
    {
        throw new error("User not found");
    }
    requiredUser._id = undefined;
    return(requiredUser);
}

const deleteUser = async(key , user_id)=>
        
{
    // check whether key exists
    const existingKey = await Key.findOne({key:key});
    if(!existingKey)
        {
            throw new error("Key not found");
        }
        if(typeof(user_id)!= string)
            {
                throw new error("Please provide user id as string")
            }
    const deletedUser = await  User.deleteOne({key:key , user_id:user_id});
    if(!deletedUser)
        {
            throw new error(" User Deletion failed");
        }
    return(" User Deletion successfully")


}
// suspend a user if malpractices found
const suspendUser = async(key,user_id)=>{
    const existingKey = await Key.findOne({key:key});
    if(!existingKey)
    {
        throw new error("Key not found")
    }
    if(typeof(user_id)!= string)
        {
            throw new error("Please provide user id as string")
        }
    const requiredUser = await User.findOne({
        $and:[
            {key:key},
            {user_id:user_id},
        ]
    })
    if(!requiredUser)
    {
        throw new error("User not found");
    }
    requiredUser.isSuspended = true;
    const suspendedUser = await requiredUser.save();
    if(!suspendedUser)
        {
              throw new error("User suspension failed")
        }
    return("User suspended successfully")



}
// unsuspend a user
const unsuspendUser = async(key,user_id)=>{
    const existingKey = await Key.findOne({key:key});
    if(!existingKey)
    {
        throw new error("Key not found")
    }
    if(typeof(user_id)!= string)
        {
            throw new error("Please provide user id as string")
        }
    const requiredUser = await User.findOne({
        $and:[
            {key:key},
            {user_id:user_id},
        ]
    })
    if(!requiredUser)
    {
        throw new error("User not found");
    }
    requiredUser.isSuspended = false;
    const unsuspendedUser = await requiredUser.save();
    //user unsuspension successsfully
    if(!unsuspendedUser)
        {
              throw new error("User unsuspension failed")
        }
    return("User unsuspended successfully")



}

export{createUser, getUser, deleteUser,suspendUser,unsuspendUser };
