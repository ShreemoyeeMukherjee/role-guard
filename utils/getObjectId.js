import mongoose from "mongoose";
import {isValidObjectId} from "mongoose";
import {error} from "../utils/error.js"
const getValidObjectId = (Id)=>{
    if(!isValidObjectId(Id))
    {
        throw new error("Please provide a valid object id")
    }
    return(new mongoose.Types.ObjectId(Id));
}
export{getValidObjectId};
