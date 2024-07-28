# role-guard

[Data Model](https://app.eraser.io/workspace/iW433hevZ60xMJf9rc6w?origin=share&elements=vrnl0lbdsHx4icqmhlZ_Ew )

## Decription
 1. a role based access control system  for security of resources
 2. scalable as static lists are not used for creation
 of roles 
 3. provides a huge scope for granular permissions
 4. logs unauthorized user activity which is accessible for 3
 months

## Usage
  To install  write the following command in the terminal  
  `npm i role-guard `
   To use this package , first create an access key which will
   uniquely identify your  resources
   ```
       import {createKey} from "role-guard"
      try{
      const received_Key = await createKey();
        console.log(received_Key);
       }
         catch(error){
          console.log("Error while creating key",error.message);
     }

   ````
   Once key is created ,
   you can do the following
   ###  1. users
   1.1.create user
   ``` 
     import {createUser} from "role-guard"
     import { accessKey } from "../constants.js";

    try{
     console.log(await createUser(accessKey,"1937"));
    }
     catch(error)
    {
      console.log("Error while creating user - ",error.message);
    }
```

   #### 1.2 get user
   ```
        import {getUser} from "role-guard"
         import { accessKey } from "../constants.js";

        try{
            console.log(await getUser(accessKey,"1933"));
        }
        catch(error)
        {
            console.log("Error while fetching user - ",error.message);
        }




   
   


