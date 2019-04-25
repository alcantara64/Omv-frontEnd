import { Injectable } from '@angular/core';
import * as OktaAuth from '@okta/okta-auth-js';
import { Router } from '@angular/router';
import { CustomersDataService } from '../data/customers/customers.data.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _auth: OktaAuth = null;

  isAuthenticating: boolean;

  constructor(private router: Router, private customersDataService: CustomersDataService) { }

  async isAuthenticated() {
    console.log('AuthService.isAuthenticated');
    //ensure auth initialized

    if (!this._auth) {
      await this.load().then(async response => {
        
        let retVal = !!(await this._auth.tokenManager.get('accessToken'));
        return retVal;
      });
    }

    // Checks if there is a current accessToken in the TokenManger.
    let retVal = !!(await this._auth.tokenManager.get('accessToken'));
    return retVal;
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
    let retVal = await this._auth.tokenManager.get('accessToken');

    if (retVal)
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
    //ensure auth initialized
    if (!this._auth) {
      await this.load();
    }

    await this._auth.token.parseFromUrl().then(tokens => {
      tokens.forEach(token => {
        console.log(token);
        if (token.idToken) {
          this._auth.tokenManager.add('idToken', token);
        }
        if (token.accessToken) {
          this._auth.tokenManager.add('accessToken', token);
        }
      });
    });

    //TODO:
    //redirect to page after login
    await this.isAuthenticated()
      .then(isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigateByUrl('/authorize-check');
        }
      });
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

  async load(): Promise<OktaAuth> {
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

    let okta_security_config: any;

    
    if (!localStorage.getItem(host)) {
      let customer = await this.customersDataService.getByHostHeader(host).toPromise();
      okta_security_config = {
        issuerUrl: customer.issuerUrl,
        clientId: customer.clientId,
        authServerId: customer.authServerId
      }
      localStorage.setItem(host, JSON.stringify(okta_security_config));
    } else {
      okta_security_config = JSON.parse(localStorage.getItem(host));
    }

    this._auth = new OktaAuth({
      url: okta_security_config.issuerUrl,
      clientId: okta_security_config.clientId,
      issuer: `${okta_security_config.issuerUrl}/oauth2/${okta_security_config.authServerId}`,
      redirectUri: `${window.location.protocol}//${window.location.host.toLowerCase()}/implicit/callback`
    });
      // return await this._auth;
  }
}

