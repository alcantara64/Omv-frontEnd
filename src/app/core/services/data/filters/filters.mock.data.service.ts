import { HttpClient } from '@angular/common/http';
import { FiltersDataService } from './filters.data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltersMockDataService implements FiltersDataService {

  constructor(private httpClient: HttpClient) { }

  getFilters(): Observable<any[]> {
    throw new Error("Method not implemented.");
  }
}