import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CustomersDataService } from '../../data/customers/customers.data.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private customerDataService: CustomersDataService) { }

  getSetting(id: number, setting: string): Observable<any> {
    return this.customerDataService.getSetting(id, setting);
  }
}
