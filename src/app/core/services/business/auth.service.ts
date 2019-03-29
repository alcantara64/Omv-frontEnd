import { Injectable } from '@angular/core';

import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private manager = new UserManager(getClientSettings());
  private user: User = null;

  constructor() {
    this.manager.getUser().then(user => {
      console.log('AuthService - completeAuthentication : user ', user);
      this.user = user;
    });
  }

  isLoggedIn(): Observable<boolean> {
    var result: boolean = this.user != null && !this.user.expired;
    console.log('AuthService - isLoggedIn: ', result);
    return of(result);
  }

  logOut() {
    this.manager.signoutRedirect().then(response => {
      console.log('AuthService - logOut');
    });
  }

  getClaims(): any {
    var profile = this.user.profile;
    console.log('AuthService - getClaims : profile', profile);
    return profile;
  }

  getAuthorizationHeaderValue(): string {
    var result = `${this.user.token_type} ${this.user.access_token}`;
    console.log('AuthService - getAuthorizationHeaderValue: ', result);
    return result;
  }

  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  completeAuthentication(): Promise<User> {
    return this.manager.signinRedirectCallback().then(user => {
      console.log('AuthService - completeAuthentication : user ', user);
      this.user = user;
      return this.user;
    });
  }
}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: 'http://localhost:5000/',
    client_id: 'test',
    redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:4200/',
    response_type: "id_token token",
    scope: "openid profile",
    filterProtocolClaims: true,
    loadUserInfo: true
  };
}