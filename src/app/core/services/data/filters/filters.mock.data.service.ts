import { HttpClient } from '@angular/common/http';
import { FiltersDataService } from './filters.data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Metadata } from 'src/app/core/models/entity/metadata';
import { Media } from 'src/app/core/models/entity/media';
import { Tag } from 'src/app/core/models/entity/tag';

@Injectable({
  providedIn: 'root'
})
export class FiltersMockDataService implements FiltersDataService {

  constructor(private httpClient: HttpClient) { }

  getFilters(): Observable<Metadata[]> {
    var url = `./assets/mock/filter-metadata.json`;
    let data = this.httpClient.get<any[]>(url);
    return data;
  }

  applyFilters(filters: Tag[], pageNumber?: number, pageSize?: number): Observable<Media> {
    throw new Error("Method not implemented.");
  }
}