import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class FiltersDataService {

  constructor() {}

  abstract getFilters(): Observable<any[]>;
}