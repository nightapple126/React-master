import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private userService: UserService,private router:Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var userDetails = this.userService.getUser();
      if(userDetails != null){
        return true
      }
      this.router.navigate(['/login'])
      return false;
    }
}
