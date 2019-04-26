import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { Http } from '@angular/http';
import { OktaDataService } from './okta.service';

@Injectable({
  providedIn: 'root'
})
export class OktaWebDataService implements OktaDataService {

  constructor(private httpClient: Http) { }

  logout() {
    const host = window.location.host.toLowerCase();
    let okta_security_config = JSON.parse(localStorage.getItem(host));
    const idToken = localStorage.getItem('id_Token');
    let url = `${okta_security_config.issuerUrl}/oauth2/${okta_security_config.authServerId}/v1/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${window.location.protocol}//${window.location.host.toLowerCase()}/implicit/callback`;
    window.location.href = url;
    // return this.httpClient.get(url);
    // return of(0);
  }
}