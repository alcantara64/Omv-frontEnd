import { Injectable } from '@angular/core';
import { FiltersDataService } from '../../data/filters/filters.data.service';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  constructor(private filtersDataService: FiltersDataService) { }

  getFilters() {
    return this.filtersDataService.getFilters();
  }
}
