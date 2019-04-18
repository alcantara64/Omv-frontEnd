import { CustomersDataService } from './customers.data.service';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

export class CustomersMockDataService implements CustomersDataService {

  constructor(private httpClient: HttpClient) { }

  getSetting(id: number, setting: string): Observable<any> {
    throw new Error("Method not implemented.");
  }
}