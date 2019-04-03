import { IAppSettings } from './../../../models/IAppSettings';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { SettingsService } from './appsettings.service';

export { User };

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _userManager: UserManager;
  hostHeader: string;
  authorityUrl: string;
  redirect_uri: string;
  post_logout_redirect_uri: string;
  silent_redirect_uri: string;
  public appSettings: IAppSettings;

  constructor(private http: Http, private appSettingsService: SettingsService) {
    this.hostHeader = decodeURI(location.href);
    this.appSettings = this.appSettingsService.getAppSettings();
    const baseUrl = this.appSettingsService.getBaseUrl();
    this.authorityUrl = `${this.appSettings.DEV_URL}`;
    this.redirect_uri = `${baseUrl}/signin-callback.html`;
    this.post_logout_redirect_uri = `${baseUrl}`;
    this.silent_redirect_uri = `${baseUrl}/silent-renew.html`;
 
    var settings = {
      authority: this.authorityUrl,
      client_id: this.hostHeader,
      redirect_uri: `${baseUrl}/assets/signin-callback.html`,
      silent_redirect_uri: `${baseUrl}/assets/silent-callback.html`,
      post_logout_redirect_uri: `${baseUrl}`,
      response_type: 'code',
      scope: 'openid profile',
      metadata: {
        issuer: `${this.authorityUrl}`,
        authorization_endpoint: `${this.authorityUrl}/connect/authorize`,
        token_endpoint: `${this.authorityUrl}/connect/token`,
        jwks_uri: `${this.authorityUrl}/.well-known/openid-configuration/jwks`,
        end_session_endpoint: `${this.authorityUrl}/connect/endsession`
      }
    };
    this._userManager = new UserManager(settings);
  }

  public getUser(): Promise<User> {
    return this._userManager.getUser();
  }

  public login(): Promise<void> {
    return this._userManager.signinRedirect();
  }

  public renewToken(): Promise<User> {
    return this._userManager.signinSilent();
  }

  public logout(): Promise<void> {
    return this._userManager.signoutRedirect();
  }
}
