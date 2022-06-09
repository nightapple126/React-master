/*
Project : Cryptotrades
FileName :  offer.service.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used to define services for admin offer module
*/
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject } from "rxjs";
import { map} from 'rxjs/operators';
import {Common} from '../models/common';
import {API} from '../constants/api'
@Injectable({
  providedIn: 'root'
})
export class OfferService {
  public notifier: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  constructor(
    private http: HttpClient
  ) { }

  /*
  * This is the function which used to list the offers
  */
  list(params:any): Observable<Common> {
    let url = API.base_url + API.offer_list + "?";
    if(params.page) {
      url = url + "&page="+ params.page
    }

    if(params.user_id) {
      url = url + "&user_id="+ params.user_id
    }

    if(params.user) {
      url = url + "&user="+ params.user
    }
    return this.http.get<Common>(url, params).pipe(map((param:any) => new Common().deserialize(param)));
  }

}
 