import mongoose from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const permissionSchema =  new mongoose.Schema({
    "permission_id":{
        type:String,
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
    "exceptions_start_time":{
        type:String,
    },
    "exceptions_end_time":{
        type:String,
    }
},
{
    timestamps:true,
})
const Permission = mongoose.model("Permission",permissionSchema);
permissionSchema.plugin(mongooseAggregatePaginate);
export{Permission};