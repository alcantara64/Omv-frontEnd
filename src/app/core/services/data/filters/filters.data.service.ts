import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Metadata } from 'src/app/core/models/entity/metadata';
import { Media } from 'src/app/core/models/entity/media';
import { Tag } from 'src/app/core/models/entity/tag';

@Injectable({
  providedIn: 'root'
})
export abstract class FiltersDataService {

  constructor() {}

  abstract getFilters(): Observable<Metadata[]>;
  abstract applyFilters(filters: Tag[], pageNumber?: number, pageSize?: number): Observable<Media>;
}