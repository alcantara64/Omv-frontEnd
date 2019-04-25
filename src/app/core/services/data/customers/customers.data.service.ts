import { Observable } from 'rxjs/internal/Observable';
import { Customer } from 'src/app/core/models/entity/customer';

export abstract class CustomersDataService {

  constructor() { }

  abstract getSetting(id: number, setting: string): Observable<any>;
  abstract getByHostHeader(header: string): Observable<Customer>;
}