import mongoose from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const resource_permissionSchema = new mongoose.Schema({
    "resource":{
        type:mongoose.Schema.Types.ObjectId,
        "ref":"Resource",
    },
    "permission":{
        type:mongoose.Schema.Types.ObjectId,
        "ref":"Permission"
    }
})
const Resource_permission = new mongoose.model("Resource_permission",resource_permissionSchema);
export{Resource_permission};