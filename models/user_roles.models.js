import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const user_roleSchema = new mongoose.model({
    "user":{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    "role":{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Role"
    }
    
})
const User_role = mongoose.model("User_role",user_roleSchema);
User_role.plugin(mongooseAggregatePaginate);
export{User_role};