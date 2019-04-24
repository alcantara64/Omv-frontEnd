import { CustomersDataService } from './customers.data.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomersWebDataService implements CustomersDataService {

  constructor(private httpClient: HttpClient) { }

  getSetting(id: number, setting: string): Observable<any> {
    var requestUri = environment.api.baseUrl + `/v1/customers/${id}/setting`;

    const options = {
      params: new HttpParams()
    };
    options.params = options.params.set('settingkey', setting);
    
    return this.httpClient.get<any>(requestUri, options);
  }
  
  getHostHeader(header: string): Observable<any> {
    var requestUri = environment.api.baseUrl + `/v1/customers/hostheader`;

    const options = {
      params: new HttpParams()
    };
    options.params = options.params.set('header', header);
    
    // return this.httpClient.get<any>(requestUri, options);

    return of({
      issuerUrl: 'https://dev-104918.okta.com',
      clientId: '0oahryql8HD45nO6v356',
      authServerId: 'default'
    });
  }
};