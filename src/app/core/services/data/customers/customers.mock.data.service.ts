import { CustomersDataService } from './customers.data.service';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Customer } from 'src/app/core/models/entity/customer';

export class CustomersMockDataService implements CustomersDataService {

  constructor(private httpClient: HttpClient) { }

  getSetting(id: number, setting: string): Observable<any> {
    throw new Error("Method not implemented.");
  }
  
  getByHostHeader(header: string): Observable<Customer> {
    throw new Error("Method not implemented.");
  }
}