import { HttpClient } from '@angular/common/http';
import { FiltersDataService } from './filters.data.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltersWebDataService implements FiltersDataService {

  constructor(private httpClient: HttpClient) { }

  getFilters(): Observable<any[]> {
    var url = `./assets/mock/filter-metadata.json`;
    let data = this.httpClient.get<any[]>(url);
    return data;
  }
}