/*
Project : Cryptotrades
FileName :  category.service.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used to define list and filter the activities.
*/
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from "rxjs";
import { map } from 'rxjs/operators';
import { Common } from '../models/common';
import { API } from '../constants/api'
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
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
    if (token.length > 0) {
      return jwtHelper.decodeToken(token);
    } else {
      return null;
    }
  }

  /*
  * This is the function which used to create category
  */
  createCategory(params: any): Observable<Common> {
    let url = API.base_url + API.category_create;
    return this.http.post<Common>(url, params).pipe(map((param: any) => new Common().deserialize(param)));
  }

  /*
  * This is the function which used to update category
  */  
  updateCategory(params: any): Observable<Common> {
    let url = API.base_url + API.category_update;
    return this.http.put<Common>(url, params).pipe(map((param: any) => new Common().deserialize(param)));
  }

  /*
  * This is the function which used to delete category
  */  
  deleteCategory(params: any): Observable<any> {

    let url = API.base_url + API.category_delete;
    let options = {
      headers: new HttpHeaders().set('Authorization', `${this.getToken()}`),
      body: params
    }
    console.log(options)
    // return this.http.delete(url, options).pipe(map((param:any) => new Common().deserialize(param)));
    return this.http.delete(url, options);
  }

  /*
  * This is the function which used to get particular category details
  */  
  viewCategory(category_id: any): Observable<Common> {
    let url = API.base_url + API.category_detail + '?category_id=' + category_id;
    return this.http.get<Common>(url).pipe(map((param: any) => new Common().deserialize(param)));
  }

  /*
  * This is the function which used to list all categories
  */  
  list(params: any): Observable<Common> {
    let url = API.base_url + API.category_list + "?";
    console.log(url);
    if (params.keyword) {
      url = url + "keyword=" + params.keyword.replace(" ", "+");
    }
    if (params.page) {
      url = url + "&&page=" + params.page
    }

    if (params.category_id) {
      url = url + "&&category_id=" + params.category_id
    }
    return this.http.get<Common>(url, params).pipe(map((param: any) => new Common().deserializeCategoryList(param)));
  }

}
