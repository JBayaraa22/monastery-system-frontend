import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot , Router } from '@angular/router';

import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let tmpUser = new User(localStorage.getItem('currentUser')) 
      let url  = this.router.url
      if (tmpUser)
      {
        return true;
      } 
        
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
  }
  isAdmin(){
    let tmpUser = new User(localStorage.getItem('currentUser')) 
      if (tmpUser && tmpUser.role == 1)
        return true
      return false 
  }
}