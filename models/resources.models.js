import mongoose from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const resourceSchema = new mongoose.Schema({
    "resource_id":{
        type:String
    }
},
{
   timestamps:true,
})
const Resource = mongoose.model("Resource",resourceSchema);
resourceSchema.plugin(mongooseAggregatePaginate);
export{Resource};