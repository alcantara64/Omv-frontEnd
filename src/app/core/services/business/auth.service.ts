import { Injectable } from '@angular/core';
import * as OktaAuth from '@okta/okta-auth-js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _auth: OktaAuth = null;
  constructor(private router: Router) { }

  async isAuthenticated() {
    console.log('AuthService.isAuthenticated');
    //ensure auth initialized
    /*
     if(!this._auth)
     {
       await this.load();
     }
 */
    if (!this._auth)
      return false;

    // Checks if there is a current accessToken in the TokenManger.
    return !!(await this._auth.tokenManager.get('accessToken'));
  }

  async getAccessToken() {
    console.log('AuthService.getAccessToken');
    //ensure auth initialized
    /*
    if(!this._auth)
    {
      await this.load();
    }
*/
    if (!this._auth)
      return false;
    // Checks if there is a current accessToken in the TokenManger.
    let retVal =  await this._auth.tokenManager.get('accessToken');
    
    if(retVal)
      return retVal.accessToken;
    else
      return null;
  }

  async login() {
    console.log('AuthService.login');
    //ensure auth initialized
    if (!this._auth) {
      await this.load();
    }

    // Launches the login redirect.


    this._auth.token.getWithRedirect({
      responseType: ['id_token', 'token'],
      scopes: ['openid', 'email', 'profile']
    });
  }

  async handleAuthentication() {
    console.log('AuthService.handleAuthentication');
    //ensure auth initialized
    
    if(!this._auth)
    {
      await this.load();
    }

    const tokens = await this._auth.token.parseFromUrl();
    tokens.forEach(token => {
      console.log(token);
      if (token.idToken) {
        this._auth.tokenManager.add('idToken', token);
      }
      if (token.accessToken) {
        this._auth.tokenManager.add('accessToken', token);
      }
    });

    //TODO:
    //redirect to page after login
    this.router.navigateByUrl('/');
  }

  async logout() {
    console.log('AuthService.handleAuthentication');
    //ensure auth initialized
    if (!this._auth) {
      await this.load();
    }

    this._auth.tokenManager.clear();
    await this._auth.signOut();
  }

  async load(): Promise<void> {
    console.log('AuthService.load.start');
    const host = window.location.host.toLowerCase(); //this includes host and port - eg localhost:4200 or bp.omv.com
    //you can test locally by having different ports go to different tenants in the api - eg localhost:4300 

    //use http client to call backend - pass the host to get back the following details from the database
    //okta issuer - eg https://dev-104918.okta.com/oauth2/default - typically the same for each okta account
    //okta app client id  - 0oahryql8HD45nO6v356 - will be different for each tenant
    //authserver - default - will be different for each tenant as I assume each tenant will have their own auth server - for demo using the default one for both tenants

    //following should be removed once connected to backend
    let issuerUrl: string = null;
    let clientId: string = null;
    let authServerId: string = null;
    switch (host) {
      case "localhost:4200":
        issuerUrl = "https://dev-104918.okta.com";
        clientId = "0oahryql8HD45nO6v356"; //tenant 1
        authServerId = 'default';

        break;
      default:
        issuerUrl = "https://dev-104918.okta.com";
        clientId = "0oahvjlps1k2dUNXJ356"; //tenant 2
        authServerId = 'default';
        break;

    };

    this._auth = new OktaAuth({
      url: issuerUrl,
      clientId: clientId,
      issuer: `${issuerUrl}/oauth2/${authServerId}`,
      redirectUri: `${window.location.protocol}//${window.location.host.toLowerCase()}/implicit/callback`
    });

    console.log('AuthService.load.end', this._auth);



  }

}

