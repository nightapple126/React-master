/*
Project : Cryptotrades
FileName :  category.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used for deserializing category model.
*/
import { Deserializable } from "./deserializable";
export class Category implements Deserializable {
    _id: any = false;
    category_image: any = false;
    create_date: any = false;
    status: any;
    title: any = false;


    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}