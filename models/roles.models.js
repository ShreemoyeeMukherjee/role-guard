import mongoose from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const roleSchema =  new mongoose.Schema(
    {
        "key":{
            type:String,
        },
    
    
         "role_id":{
            type:String,
         },

    },
    {
        timestamps:true,
    }
)
const Role = mongoose.model("Role",roleSchema);
roleSchema.plugin(mongooseAggregatePaginate);
export{Role};