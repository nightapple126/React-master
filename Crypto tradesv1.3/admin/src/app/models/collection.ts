/*
Project : Cryptotrades
FileName :  collection.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used for deserializing collection model.
*/
import { Deserializable } from "./deserializable";
export class Collection implements Deserializable {
    _id: any = false;
    royalties: any = false;
    name: any = false;
    description: any;
    banner: any = false;
    image: any = false;


    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}