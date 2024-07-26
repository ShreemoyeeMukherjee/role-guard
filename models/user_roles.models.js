import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const user_roleSchema = new mongoose.Schema({
    "key":{
        type:String,
    },
    "user_id":{
        type:String,
        ref:"User"
    },
    "role_id":{
        type:String,
        ref:"Role"
    }
    
})
const User_role = mongoose.model("User_role",user_roleSchema);
user_roleSchema.plugin(mongooseAggregatePaginate);
export{User_role};