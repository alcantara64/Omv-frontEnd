import { CustomersDataService } from './customers.data.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Customer } from 'src/app/core/models/entity/customer';
import { CustomerHostHeaderDTO } from 'src/app/core/dtos/output/customers/CustomerHostHeaderDTO';

@Injectable({
  providedIn: 'root'
})
export class CustomersWebDataService implements CustomersDataService {

  constructor(private httpClient: HttpClient) { }

  getSetting(setting: string): Observable<any> {
    var requestUri = environment.api.baseUrl + `/v1/customers/setting`;

    const options = { params: new HttpParams() };
    options.params = options.params.set('settingkey', setting);
    
    return this.httpClient.get<any>(requestUri, options);
  }
  
  getByHostHeader(header: string): Observable<Customer> {
    var requestUri = environment.api.baseUrl + `/v1/customers`;

    const options = { params: new HttpParams() };
    options.params = options.params.set('header', header);

    return this.httpClient.get<CustomerHostHeaderDTO>(requestUri, options).pipe(
      map(response => {
        automapper
          .createMap(CustomerHostHeaderDTO, Customer)
          .forMember('id', function (opts) { opts.mapFrom('customerId'); })
          .forMember('name', function (opts) { opts.mapFrom('name'); })
          .forMember('authServerId', function (opts) { opts.mapFrom('authServerId'); })
          .forMember('issuerUrl', function (opts) { opts.mapFrom('issuerUrl'); })
          .forMember('clientSecret', function (opts) { opts.mapFrom('clientSecret'); })
          .forMember('clientId', function (opts) { opts.mapFrom('clientId'); });

        var user = automapper.map(CustomerHostHeaderDTO, Customer, response);
        console.log('CustomersWebDataService - getHostHeader: ', user);
        return user;
      })
    );
  }
};