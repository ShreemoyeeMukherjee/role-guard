import {Key} from "../models/keys.models.js"
import { User } from "../models/users.models.js"
import {Role} from  "../models/roles.models.js"
import { Permission } from "../models/permissions.models.js"
import { User_role } from "../models/user_roles.models.js"
const createKey = async()=>{
const value = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const n = value.length;
let result = "";
    while(true)
        {
             result =  "";
            for( i = 0;i<9;i++)
                {
                    let index = Math.floor(Math.random()*n);
                    result+=value[index];

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
const deleteKey = async(key)=>{
    const existingKey = await Key.findOne({key:key});
    if(!existingKey)
        {
            //return()
        }
    const deleteuserwithKey = await User.deleteMany({key:key});
    const deleterolewithKey = await Role.deleteMany({key:key});
    const deleteuserrolewithKey = await User_role.deleteMany({key:key});
    const deletepermissionwithKey = await Permission.deleteMany({key:key});
    const deletekeywithkey = await Key.deleteOne({key:key});



}
export{createKey, deleteKey};