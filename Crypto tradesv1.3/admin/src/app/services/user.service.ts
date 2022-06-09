/*
Project : Cryptotrades
FileName :  user.service.ts
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
export class UserService {
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
  * This is the function which used to get user
  */
  getUser() {
    var jwtHelper = new JwtHelperService();
    var token = this.getToken()
    if(token.length>0) {
      return jwtHelper.decodeToken(token);
    } else {
      return null;
    }
  }

  /*
  * This is the function which used to login user
  */
  loginApi(params:any): Observable<Common> {
    let url = API.base_url + API.user_login;
    return this.http.post<Common>(url, params).pipe(map((param:any) => new Common().deserializeLoggedIn(param)));
  }

  /*
  * This is the function which used to create new user
  */
  createUsers(params:any): Observable<Common> {
    let url = API.base_url + API.user_create;
    return this.http.post<Common>(url, params).pipe(map((param:any) => new Common().deserialize(param)));
  }

  /*
  * This is the function which used to update user details
  */
  updateUsers(params:any): Observable<Common> {
    let url = API.base_url + API.user_update;
    return this.http.post<Common>(url, params).pipe(map((param:any) => new Common().deserialize(param)));
  }

  /*
  * This is the function which used to get particular user details
  */
  viewProfile(user_id:any): Observable<Common> {
    let url = API.base_url + API.user_profile + '/' + user_id;
    return this.http.get<Common>(url).pipe(map((param:any) => new Common().deserialize(param)));
  }

  /*
  * This is the function which used to get user details
  */
  list(params:any): Observable<Common> {
    let url = API.base_url + API.user_list + "?";
    if(params.keyword) {
      url = url + "keyword="+ params.keyword.replace(" ", "+");
    }
    if(params.page) {
      url = url + "&&page="+ params.page
    }

    if(params.user_id) {
      url = url + "&&user_id="+ params.user_id
    }
    return this.http.get<Common>(url, params).pipe(map((param:any) => new Common().deserializeUserList(param)));
  }

}
 
