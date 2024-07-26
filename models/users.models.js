import mongoose from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const  userSchema = new mongoose.Schema({
    "key":{
        type:String,
        ref:"keys",
    },
    "user_id":{
        type:String,
    },
    "isSuspended":{
        type:Boolean,
    }
    
},
{
    timestamps:true,
})
const User = new mongoose.model("User",userSchema);
userSchema.plugin(mongooseAggregatePaginate);
export{User};
