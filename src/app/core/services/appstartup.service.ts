import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppStartupService  {

  public clientId: string;
  public issuerUrl: string;

  constructor(private httpClient: HttpClient) { }

  load(): any//Promise<any> --needs to return promise when calling httpclient
  {
    console.log('AppStartupService.load.start');
      const host = window.location.host.toLowerCase(); //this includes host and port - eg localhost:4200 or bp.omv.com
      //you can test locally by having different ports go to different tenants in the api - eg localhost:4300 

      //use http client to call backend - pass the host to get back the following details from the database
      //okta issuer - eg https://dev-104918.okta.com/oauth2/default - typically the same for each okta account
      //okta app client id  - 0oahryql8HD45nO6v356 - will be different for each tenant

      //following should be removed once connected to backend
      switch(host)
      {
        case "localhost:4200":
          this.issuerUrl = "https://dev-104918.okta.com/oauth2/default";
          this.clientId = "0oahryql8HD45nO6v356"; //tenant 1

          break;
        default:
          this.issuerUrl = "https://dev-104918.okta.com/oauth2/default";
          this.clientId = "0oahvjlps1k2dUNXJ356"; //tenant 2
          break;
          
      };

      const config = {
        issuer: this.issuerUrl,
        clientId: this.clientId
      };

      console.log('AppStartupService.load.end', config);
      return config;


  }
}
