/*
Project : Cryptotrades
FileName :  common.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used for deserializing all responses based on models.
*/
import { Deserializable } from "./deserializable";
import { User } from "./user";
import { Activity } from "./activity";
import { Item } from "./item";
import { Category } from "./category";
import { Collection } from './collection';
export class Common implements Deserializable {
    return_id:any;
	status:any;
	message:any;
	tempArray: Array<any> = [];
	result:any;
	data: any;
    /*
	* this function is used for deserialize common data
	*/
    deserialize(input: any): this {
       return Object.assign(this, input);
    }
	/*
	* this function is used for deserialize login response
	*/
	deserializeLoggedIn(input: any): this {
		if(input.status == true) {
			this.return_id = input.token
		}
		return Object.assign(this, input);
	}
	/*
	* this function is used for deserialize user list
	*/
	deserializeUserList(input: any): this {
		Object.assign(this, input);
		if(input.status == true) {
			var users = [];
			for (let index = 0; index < input.data.docs.length; index++) {
				const element = input.data.docs[index];
				users.push(new User().deserialize(element));
			}
			this.tempArray = users
		}
		return this;
	}
	/*
	* this function is used for deserialize activity list
	*/
	deserializeActivityList(input: any): this {
		Object.assign(this, input);
		if(input.status == true) {
			var activity = [];
			for (let index = 0; index < input.data.docs.length; index++) {
				const element = input.data.docs[index];
				activity.push(new Activity().deserialize(element));
			}
			this.tempArray = activity
		}
		return this;
	}
	/*
	* this function is used for deserialize activity list
	*/
	deserializeItemList(input: any): this {
		Object.assign(this, input);
		if(input.status == true) {
			var items = [];
			for (let index = 0; index < input.data.docs.length; index++) {
				const element = input.data.docs[index];
				items.push(new Item().deserialize(element));
			}
			this.tempArray = items
		}
		return this;
	}
	/*
	* this function is used for deserialize activity list
	*/
	deserializeCategoryList(input: any): this {
		Object.assign(this, input);
		if(input.status == true) {
			var items = [];
			for (let index = 0; index < input.data.docs.length; index++) {
				const element = input.data.docs[index];
				items.push(new Category().deserialize(element));
			}
			this.tempArray = items
		}
		return this;
	}
	/*
	* this function is used for deserialize collection list
	*/
	deserializeCollectionList(input: any): this {
		Object.assign(this, input);
		if(input.status == true) {
			var items = [];
			for (let index = 0; index < input.data.docs.length; index++) {
				const element = input.data.docs[index];
				items.push(new Collection().deserialize(element));
			}
			this.tempArray = items
		}
		return this;
	}
}