import mongoose from "mongoose"
import {User} from "../models/users.models.js"
import {error} from  "../utils/error.js"

// if (mongoose.connection.readyState == 1) {
    

const createUser = async(user_id)=>{
        
    if(typeof(user_id)!= 'string') // type must always be in string
    {
        
        throw new error("Please enter a valid string as user_id");
    }
    else
    {
        const newUser = await User.create({
            user_id :user_id,
        })
        //console.log(newUser);
        if(!newUser)
        {
            throw new error("New user creation failed");
        }
        const newUserobjectIdString = newUser._id.toString();
        return(newUserobjectIdString);
    }

}
// }
// else{
//     throw new error("Connection not established")
// }
const getUser = async(userobjectIdString)=>{
    
    const requiredUser = await User.findById(userobjectIdString);
    if(!requiredUser)
    {
        throw new error("User not found");
    }
    
    return(requiredUser.user_id);
}
const updateUser = async(userobjectIdString , newuser_id)=>{
    const usertobeUpdated = await User.findById(userobjectIdString);
    if(!usertobeUpdated)
    {
        throw new error("User not found");
    }
    else
    {
        usertobeUpdated.user_id = newuser_id;
        const updatedUser = await usertobeUpdated.save();
        return(updatedUser._id.toString());
    }
     
}

export{createUser, getUser,updateUser };
