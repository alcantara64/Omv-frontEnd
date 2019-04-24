import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/business/auth.service';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  @Select(AppState.getIsAuthorized) isAuthorized$: Observable<boolean>;  
  isAuthenticated: boolean;

  constructor(private auth: AuthService, private router: Router) {    
  }

  canActivate() {
    const route = location.hash;

    this.isAuthorized$      
      .subscribe(async isAuthenticated => {
        console.log('AuthGuardService constructor - isAuthenticated: ', isAuthenticated);
        if (isAuthenticated === false) {
          this.saveReturnUrl(route);
        }
        this.isAuthenticated = isAuthenticated;
      });

    return this.isAuthenticated;
  }

  private saveReturnUrl(route) {
    const ignored_routes = ['/startup', '/dashboard'];
    if (ignored_routes.includes(route)) {
      return;
    }
    const key = 'return_url';
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
    }
    localStorage.setItem(key, route);
  }

}