import {Key} from "../models/keys.models.js"
import { User } from "../models/users.models.js"
import {Role} from  "../models/roles.models.js"
import { Permission } from "../models/permissions.models.js"
import { User_role } from "../models/user_roles.models.js"
import {error} from "../utils/error.js"
import {Resource} from "../models/resources.models.js"
import {key_creation_characters} from "../constants.js"
// generate unique key for each user who installs the package for easy identification
// of data for that particular user
const createKey = async()=>{

const n = key_creation_characters.length;
let result = "";
    while(true)
        {
             result =  "";
            for( i = 0;i<9;i++)
                {
                    let index = Math.floor(Math.random()*n);
                    result+=key_creation_characters[index];

                }
            const existingKey = await Key.findOne({key:result});
            if(!existingKey)
                {
                    const createdKey=  await Key.create({
                        key:result,
                    })
                    break;
                }
            
        }
        return(result);
}
// when user wants  his/her key , it is assumed he/she wants to uninstall the
//package , so all data with that specified key is deleted
const deleteKey = async(key)=>{
    const existingKey = await Key.findOne({key:key});
    if(!existingKey)
        {
            throw new error("Key not found")
        }
    const deleteuserwithKey = await User.deleteMany({key:key});
    const deleterolewithKey = await Role.deleteMany({key:key});
    const deleteuserrolewithKey = await User_role.deleteMany({key:key});
    const deletepermissionwithKey = await Permission.deleteMany({key:key});
    const deleteresourcewithKey = await Resource.deleteMany({key:key});
    const deletekeywithkey = await Key.deleteOne({key:key});



}
export{createKey, deleteKey};