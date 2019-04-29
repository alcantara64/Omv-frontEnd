import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CustomersDataService } from '../../data/customers/customers.data.service';
import { Customer } from 'src/app/core/models/entity/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private customerDataService: CustomersDataService) { }

  getSetting(setting: string): Observable<any> {
    return this.customerDataService.getSetting(setting);
  }

  getByHostHeader(header: string): Observable<Customer> {
    return this.customerDataService.getByHostHeader(header);
  }
}
