import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/business/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  
  authenticated;

  constructor(private auth: AuthService, private router: Router) {
    this.authenticated = auth.isAuthenticated()
    
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticated) { return true; }

    // Redirect to login flow.
    this.auth.login();
    return false;
  }

}