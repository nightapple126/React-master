/*
Project : Cryptotrades
FileName :  user.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used for deserializing user model.
*/
import {Deserializable} from "./deserializable";
export class User implements Deserializable{
    _id:any;
    username:any;
    email:any;
    first_name:any;
    last_name:any;
    profile_image:any;
    status:any;
    dob:any;
    phone:any;


    deserialize(input: any) {
      Object.assign(this, input);
      if(this.profile_image.length==0) {
        this.profile_image = "nouser.jpg"
      }
      return this;
    }
}