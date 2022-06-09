import { Injectable } from '@angular/core';
import {
   HttpInterceptor, HttpHandler, HttpRequest
  } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private user: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.user.getToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    if(authToken != '') {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', authToken)
      }); 
      return next.handle(authReq);
    } else {
      const authReq = req.clone(); 
      return next.handle(authReq);
    }


    // send cloned request with header to the next handler.
    
  }
}