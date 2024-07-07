import mongoose from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const permissionSchema =  new mongoose.Schema({
    "role_id":{
        type:String,
        ref:"Role"

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
    "exceptions_start_time":{
        type:String,
    },
    "exceptions_end_time":{
        type:String,
    },
},

{
    timestamps:true,
})
const Permission = mongoose.model("Permission",permissionSchema);
permissionSchema.plugin(mongooseAggregatePaginate);
export{Permission};