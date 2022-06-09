/*
Project : Cryptotrades
FileName :  item.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used for deserializing item model.
*/
import { Deserializable } from "./deserializable";
export class Item implements Deserializable {
    _id: any = false;
    like_count: any = 0;
    price: any = false;
    status: any;
    name: any = false;
    description: any = false;
    thumb: any = false;
    create_date: any = false;


    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}