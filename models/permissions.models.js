import mongoose from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const permissionSchema =  new mongoose.Schema({
    "key":{
        type:String,
    },
    "role_id":{
        type:String,
        ref:"Role"

    },
    "permission_id":{
        type:String,
    },
    "resource_id":{
        type:String,
        ref:"Resource"
    },
    "days":[{
        type:Boolean,
    }],
    "start_time":{
        type:String,
    },
    "end_time":{
        type:String,
    },
    "max_duration":{
        type:Number,
    },

    
},

{
    timestamps:true,
})
const Permission = mongoose.model("Permission",permissionSchema);
permissionSchema.plugin(mongooseAggregatePaginate);
export{Permission};