import { Injectable } from '@angular/core';
import { FiltersDataService } from '../../data/filters/filters.data.service';
import { FieldConfiguration } from 'src/app/shared/dynamic-components/field-setting';
import { MetadataFieldType } from 'src/app/core/enum/metadataFieldType';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  constructor(private filtersDataService: FiltersDataService) { }

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
          case MetadataFieldType.MultiSelect:
            field = this.buildComboBox(filter);
            break;
        }
        filterFields.push(field);
      });
    }
    return await filterFields;
  }

  private buildComboBox(item: any): FieldConfiguration {
    return {
      type: "combobox",
      name: item.name,
      label: item.label.toUpperCase(),
      order: item.order,
      options: item.options,
      cssClass: 'col-md-4',
      placeholder: `Search in ${item.label}`,
    };
  }
}
