import mongoose from "mongoose"
const keySchema = new mongoose.Schema({
    "key":{
        type:String,
    },
    
},
{
   timestamps:true,
})
const Key = mongoose.model("Key",idSchema);
export{key};
