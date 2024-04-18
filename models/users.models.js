import mongoose from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const  userSchema = new mongoose.Schema({
    "user_id":{
        type:String,
    },
    
},
{
    timestamps:true,
})
const User = new mongoose.model("User",userSchema);
userSchema.plugin(mongooseAggregatePaginate);
export{User};
