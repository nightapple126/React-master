/*
Project : Cryptotrades
FileName :  settings.service.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used to define services for admin settings module
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
export class SettingsService {
  public notifier: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  constructor(
    private http: HttpClient
  ) { }

  /*
  * This is the function which used to save the settings options
  */
  setOption(params:any): Observable<Common> {
    let url = API.base_url + API.option_set;
    return this.http.post<Common>(url, params).pipe(map((param:any) => new Common().deserialize(param)));
  }

  /*
  * This is the function which used to get the settings options
  */
  getOption(name:any): Observable<Common> {
    let url = API.base_url + API.option_get + '?name=' + name;
    return this.http.get<Common>(url).pipe(map((param:any) => new Common().deserialize(param)));
  }

}
 