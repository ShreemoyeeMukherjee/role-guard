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
<<<<<<< HEAD
   It is recommended to wrap the all the function in a try-catch block
   The following example shows how to use any function of the package
   ```
       import * as roleg from "role-guard"
       try
       {
              console.log(await roleg.function_name(accesskey,parameters));
       }
       catch(error)
       {
         console.log(error.message);
       }

  ````
  To use this package , first create an access key which will
   uniquely identifies your  resources
=======
   To use this package , first create an access key which will
   uniquely identify your  resources
>>>>>>> 395d3cbbe9f1f6328930ef13747182910e253560
   ```
       import * as roleg from "role-guard"
       try
       {
              const accessKey = await createKey();
       }
       catch(error)
       {
         console.log(error.message);
       }

  ````

   Once key is created ,
   you can do the following

   Note: All kinds of id like user_id,  role_id etc must be provided as string
   ###  1. users
   #### 1.1.create user
   ``` 
      console.log(await roleg.createUser(accessKey,user_id));
  ```

   #### 1.2 get user
   ```
        console.log(await roleg.getUser(accessKey,user_id));
  ```
  #### 1.3 suspend  user
   ```
        console.log(await roleg.suspendUser(accessKey,user_id));
  ```
  #### 1.4 unsuspend  user
   ```
        console.log(await roleg.unsuspendUser(accessKey,user_id));
  ```
   #### 1.5 delete  user
   ```
    console.log(await roleg.deleteUser(accessKey,user_id));
  ```

###  2. resources
   #### 2.1.create resource
   ``` 
  console.log(await roleg.createResource(accessKey,resource_id));
  ```

   #### 2.2 get resource
   ```
        console.log(await roleg.getResource(accessKey,resource_id));
  ```
  
   #### 2.3 delete  resource
   ```
    console.log(await roleg.deleteResource(accessKey,resource_id));
  ```
  ###  3. roles
   #### 3.1.create role
   ``` 
  console.log(await roleg.createRole(accessKey,role_id));
  ```

   #### 3.2 get Role
   ```
  console.log(await roleg.getRole(accessKey,role_id));
  ```
  
   #### 3.3 delete  Role
   ```
     console.log(await roleg.deleteRole(accessKey,role_id));
  ```

  ###  4. user roles
   #### 4.1.create userrole
   ``` 
  console.log(await roleg.createUserRole(accessKey,user_id,role_id));
  ```

   #### 4.2 get all roles for user 
   ```
  console.log(await roleg.get_all_roles_for_user(accessKey,user_id));
  ```
  #### 4.2 get all users for role
   ```
  console.log(await roleg.get_all_users_for_role(accessKey,role_id));
  ```
  
   #### 4.4 delete  userRole
   ```
     console.log(await roleg.deleteUserRole(accessKey,user_id,role_id));
  ```
###  5. permissions
  Here  a permission object is required . Following is an example of the permission object . These are the only fields which are 
  allowed

  ````
             const creationObject = 
             {
               permission_id :"1009", // string
              days:[true,false, false,false, false, false,false],
              // boolean array of size 7 . If days[i] = true , it signifies 
              the following role_id can access the resource on that particular day
              start_time:"10:00", // string  , the time from which resource can be accessed
              end_time:"14:00",
              role_id:"1014", // must already exist in database
              resource_id:"1232",
              max_duration:0.02, // maximum time for which resource can be accessed
              }
  ````

   #### 5.1.create permission
   ``` 
  console.log(await roleg.createPermission(accessKey,permission_id, creationObject));
  ```

   #### 5.2 update permission
   ```
  console.log(await roleg.updatePermission(accessKey,permission_id,  updationObject));
  ```
  #### 5.3 get permission
   ```
  console.log(await roleg.getPermission(accessKey,permission_id));
  ```
  
   #### 5.4 delete  permission
   ```
     console.log(await roleg.deletePermission(accessKey,permission_id));
  ```

  To check whether a following user can access a particular resource or not , use the following function:
  ```    
        console.log(await roleg.canAccess(accessKey, user_id, resource_id));
  ```
  To get unauthorized activity of an user , use the following function
  ``` 
      console.log(await roleg.getUnauthorizedActivityofUser(user_id));
  ```
  If you wish to uninstall the package use the following function before doing so
  ```
        console.log(await  roleg.deleteKey(accessKey));
  ```
  Note: Using the above function would delete all resources corresponding to the given user key from the database



  

  

    

