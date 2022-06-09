/*
Project : Cryptotrades
FileName :  item.service.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used to define list and search the item list api functionalities.
*/
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject } from "rxjs";
import { map} from 'rxjs/operators';
import {Common} from '../models/common';
import {API} from '../constants/api'
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  public notifier: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(
    private http: HttpClient
  ) { }
  /*
  * This is the function which used to get user session
  */
  getToken = () => {
    var token = localStorage.getItem('token')
    return token == null ? '' : token;
  }

  /*
  * This is the function which used to get item info
  */
  viewItem(params:any): Observable<Common> {
    let url = API.base_url + API.item_list + "?user=admin&type=view&";
    if(params.item_id) {
      url = url + "item_id="+ params.item_id.replace(" ", "+");
    }   
    return this.http.get<Common>(url, params).pipe(map((param:any) => new Common().deserializeItemList(param)));
  }

  /*
  * This is the function which used to get item list data
  */
  list(params:any): Observable<Common> {
    let url = API.base_url + API.item_list + "?user=admin&";
    if(params.keyword) {
      url = url + "keyword="+ params.keyword.replace(" ", "+");
    }
    if(params.page) {
      url = url + "&page="+ params.page
    }    
    return this.http.get<Common>(url, params).pipe(map((param:any) => new Common().deserializeItemList(param)));
  }
}
