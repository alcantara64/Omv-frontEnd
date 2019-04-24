import { Observable } from 'rxjs/internal/Observable';

export abstract class CustomersDataService {

  constructor() { }

  abstract getSetting(id: number, setting: string): Observable<any>;
  abstract getHostHeader(header: string): Observable<any>;
}