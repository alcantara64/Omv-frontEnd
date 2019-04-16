import { CustomersDataService } from './customers.data.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
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
    
    return this.httpClient.get<any>(requestUri, options).pipe(
      map(response => {
          console.log('CustomersWebDataService - getSetting response: ', response);
      })
    );
  }
};