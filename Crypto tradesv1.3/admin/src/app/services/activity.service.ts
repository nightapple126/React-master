/*
Project : Cryptotrades
FileName :  activity.service.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used to define list and filter the activities.
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from "rxjs";
import { map } from 'rxjs/operators';
import { Common } from '../models/common';
import { API } from '../constants/api'
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class ActivityService {
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
  * This is the function which used to activity list
  */
  list(params: any): Observable<Common> {
    let url = API.base_url + API.activity_list + "?";
    if (params.filter) {
      url = url + "filter=" + params.filter;
    }
    if (params.page) {
      url = url + "&page=" + params.page
    }
    return this.http.get<Common>(url, params).pipe(map((param: any) => new Common().deserializeActivityList(param)));
  }
}
