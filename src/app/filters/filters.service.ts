import { Injectable } from '@angular/core';
import { FieldConfiguration } from '../shared/dynamic-components/field-setting';
import { FiltersDataService } from '../core/services/data/filters/filters.data.service';
import { MetadataFieldType } from '../core/enum/metadataFieldType';

@Injectable({
  providedIn: 'root'
})
export class FiltersComponentService { 

  constructor(private filtersDataService: FiltersDataService) { }

  
  async getFilterFields() {
    let filterFields: FieldConfiguration[] = [];
    let filters = await this.filtersDataService.getFilters().toPromise();
    if (filters) {
      // Step 1: Get all filters
      filters.forEach(filter => {
        let field: FieldConfiguration;
        switch(filter.type) {
          case MetadataFieldType.MultiSelect:
            field = this.buildMultiDropdown(filter);
            break;
        }
        filterFields.push(field);
      });
    }
    return await filterFields;
  }

  private buildMultiDropdown(item: any): FieldConfiguration {
    return {
      type: "multiselect",
      name: item.name,
      label: item.label.toUpperCase(),
      order: item.order,
      options: item.options,
      cssClass: 'col-md-4',
      placeholder: `Search in ${item.fieldName}`,
    };
  }
}