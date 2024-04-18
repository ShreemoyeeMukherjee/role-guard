import mongoose from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const permissionSchema =  new mongoose.Schema({
    "permission_id":{
        type:String,
    },
    "days":[{
        type:Number,
    }],
    "start_time":{
        type:Date,
    },
    "end_time":{
        type:Date,
    },
    "exceptions":{
        type:Object,
    }
},
{
    timestamps:true,
})
const Permission = mongoose.model("Permission",permissionSchema);
permissionSchema.plugin(mongooseAggregatePaginate);
export{Permission};