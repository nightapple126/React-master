import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject } from "rxjs";
import { map} from 'rxjs/operators';
import {Common} from '../models/common';
import {API} from '../constants/api'
import {JwtHelperService} from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  public notifier: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  constructor(
    private http: HttpClient
  ) { }

  getToken = () => {
    var token = localStorage.getItem('token')
    return token == null ? '' : token;
  }



  getUser() {
    var jwtHelper = new JwtHelperService();
    var token = this.getToken()
    if(token.length>0) {
      return jwtHelper.decodeToken(token);
    } else {
      return null;
    }
  }


  viewCollection(collectionId:any): Observable<Common> {
    let url = API.base_url + API.collection_view + '?collection_id=' + collectionId;
    return this.http.get<Common>(url).pipe(map((param:any) => new Common().deserialize(param)));
  }

  list(params:any): Observable<Common> {
    let url = API.base_url + API.collection_list + "?";
    console.log(url);
    if(params.keyword) {
      url = url + "keyword="+ params.keyword.replace(" ", "+");
    }
    if(params.page) {
      url = url + "&&page="+ params.page
    }

    if(params.collection_id) {
      url = url + "&&collection_id="+ params.collection_id
    }
    return this.http.get<Common>(url, params).pipe(map((param:any) => new Common().deserializeCollectionList(param)));
  }

}
 