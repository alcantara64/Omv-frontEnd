import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/business/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) { }

  canActivate1(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.authService.startAuthentication();
    return false;
  }

  canActivate() {
    // const route = location.pathname;
    // const isLoggedIn = this.authService.isLoggedIn();
    // isLoggedIn.subscribe(login => {
    //   if (!login) {
    //     this.saveReturnUrl(route);
    //     this.authService.startAuthentication();
    //   }
    // });
    // return isLoggedIn;
    return true;
  }

  private saveReturnUrl(route) {
    const ignored_routes = ['#/startup', '#/dashboard'];
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