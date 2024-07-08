import {Key} from "../models/keys.models.js"
import {error} from "./error.js"
// an utility function to validate  unique key assigned to each user who has
 // downloaded this package 
const validateKey = async(key)=>{
    if(!key)
        {
            throw new error("Key required");
        }
        const existingKey = await Key.findOne({key:key});
    if(!existingKey)
        {
            throw new error("Key not found");
        }
        return(true);
}
export{validateKey};