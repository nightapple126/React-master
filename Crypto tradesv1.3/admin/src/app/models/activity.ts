/*
Project : Cryptotrades
FileName :  activity.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used for deserializing activity model.
*/
import { Deserializable } from "./deserializable";
export class Activity implements Deserializable {
    _id: any = false;
    item_id: any = false;
    collection_id: any = false;
    from_id: any;
    to_id: any = false;
    transaction_hash: any = false;
    history_type: any = false;
    price: any = false;
    created_date: any = false;


    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}