import { Observable } from 'rxjs/internal/Observable';
import { Customer } from 'src/app/core/models/entity/customer';

export abstract class CustomersDataService {

  constructor() { }

  abstract getSetting(setting: string): Observable<any>;
  abstract getByHostHeader(header: string): Observable<Customer>;
}