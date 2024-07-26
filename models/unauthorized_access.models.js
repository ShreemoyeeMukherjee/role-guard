import mongoose from "mongoose"
const unauthorizedaccessSchema = new mongoose.Schema({
    "key":{
        type:String,
    },
    "resource_id":{
        type:String,
        ref:"Role",
    },
    "user_id":{
        type:String,
        ref:"Role",
    },
    
    "count":{
        type:Number,
            
        },
    "lastAccessedTime":{
        type:Date,
        default:Date.now(),
        expires:7776000 // 3 months in seconds

    }
    
},
{
  timestamps:true,  
}
)
const Unauthorizedaccess =  mongoose.model("Unauthorizedaccess",unauthorizedaccessSchema);
export{Unauthorizedaccess};