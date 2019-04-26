import { Injectable } from '@angular/core';
import { FiltersDataService } from '../../data/filters/filters.data.service';
import { FieldConfiguration } from 'src/app/shared/dynamic-components/field-setting';
import { MetadataFieldType } from 'src/app/core/enum/metadataFieldType';
import { Metadata } from 'src/app/core/models/entity/metadata';
import { Tag } from 'src/app/core/models/entity/tag';
import { Media } from 'src/app/core/models/entity/media';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  constructor(private filtersDataService: FiltersDataService) { }

  applyFilters(filters: Tag[], pageNumber?: number, pageSize?: number): Observable<Media> {
    return this.filtersDataService.applyFilters(filters, pageNumber, pageSize);
  }

  getFilters() {
    return this.filtersDataService.getFilters();
  }

  async getFilterFields() {
    let filterFields: FieldConfiguration[] = [];
    let filters = await this.filtersDataService.getFilters().toPromise();
    if (filters) {
      // Step 1: Get all filters
      filters.forEach(filter => {
        let field: FieldConfiguration;
        switch(filter.type) {
          case MetadataFieldType.Text:
            field = this.buildTextBox(filter);
            break;
          case MetadataFieldType.Select:
            field = this.buildComboBox(filter);
            break;
          case MetadataFieldType.Date:            
            field = this.buildDateRange(filter);
            break;
          case MetadataFieldType.DateRange:            
            field = this.buildDateRange(filter);
            break;
        }
        filterFields.push(field);
      });
    }
    return await filterFields;
  }

  private buildComboBox(item: Metadata): FieldConfiguration {
    return {
      type: "combobox",
      name: item.name,
      label: item.name.toUpperCase(),
      order: item.order,
      options: item.options,
      cssClass: 'col-md-3',
      placeholder: `Search in ${item.name}`,
    };
  }

  private buildTextBox(item: Metadata): FieldConfiguration {
    return {
      type: "input",
      inputType: "text",
      label: item.name.toUpperCase(),
      name: item.fieldName,
      order: item.order,
      cssClass: 'col-md-3',
      placeholder: `Search in ${item.name}`
    };
  }

  private buildDate(item: Metadata): FieldConfiguration {
    return {
      type: "date",
      name: item.fieldName,
      label: item.name.toUpperCase(),
      order: item.order,
      cssClass: 'col-md-3',
      placeholder: `Search in ${item.name}`
    };
  }

  private buildDateRange(item: Metadata): FieldConfiguration {
    return {
      type: "dateRange",
      name: item.name,
      label: item.name.toUpperCase(),
      order: item.order,
      cssClass: 'col-md-6',
      placeholder: `Search in ${item.name}`,
    };
  }
}
