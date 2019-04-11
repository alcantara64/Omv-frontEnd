import { Injectable } from "@angular/core";
import { Validators, ValidatorFn } from "@angular/forms";
import { FieldConfiguration, FieldValidator } from "src/app/shared/dynamic-components/field-setting";
import { map } from "rxjs/operators";
import { DirectoryDataService } from 'src/app/core/services/data/directory/directory.data.service';
import { MetadataFieldsDataService } from 'src/app/core/services/data/metadata-fields/metadata-fields.data.service';
import { MetadataFieldType } from 'src/app/core/enum/metadataFieldType';
import { Metadata } from 'src/app/core/models/entity/metadata';

@Injectable({
  providedIn: "root"
})
export class MediaUploadService {

  constructor(private directoryDataService: DirectoryDataService, private metadataFieldsDataService: MetadataFieldsDataService) {}

  async getDirectoryMetadata(directoryId: number) {
    let metaArray = [];
    let items = await this.directoryDataService.getMetadata(directoryId).toPromise();
    if (items) {
      items.forEach(async item => {
        let field: any; 
        switch(item.fieldTypeName) {
          case MetadataFieldType.Text:
            field = this.buildTextBox(item);
            break;
          case MetadataFieldType.Select:
            field = this.buildDropdown(item);
            break;
          case MetadataFieldType.Date:
            field = this.buildDate(item);
            break;
        }
        metaArray.push(field);
      });  
    }

    metaArray.forEach(async item => {
      if (item.type === 'select') {
        item.options = await this.getOptions(item.optionsId).toPromise();      
      }
    });

    return await metaArray.sort(x => x.order);
  }

  private getOptions(id: any) {
    return this.metadataFieldsDataService.getListItems(id).pipe(
      map(items => {
        let options = [];
        items.forEach(res => {
          let option = { "value": res.value, "text": res.description, "sort": res.sort };
          options.push(option);
        });
        return options.sort(x => x.sort);
      })
    );
  }

  private buildTextBox(item: Metadata): FieldConfiguration {
    return {
      type: "input",
      label: item.fieldName,
      inputType: "text",
      name: item.fieldName,
      order: item.order,
      placeholder: item.fieldName,
      validations: this.getValidations(item)
    };
  }

  private buildLabel(item: Metadata): FieldConfiguration {
    return {
      type: "label",
      label: item.fieldName,
      name: item.fieldName,
      order: item.order
    };
  }

  private buildDropdown(item: Metadata): FieldConfiguration {
    return {
      type: "select",
      label: item.fieldName,
      name: item.fieldName,
      order: item.order,
      optionsId: item.listId,
      options: [],
      placeholder: 'Please select',
      validations: this.getValidations(item)
    };
  }

  private buildDate(item: Metadata): FieldConfiguration {
    return {
      type: "date",
      label: item.fieldName,
      name: item.fieldName,
      order: item.order,
      validations: this.getValidations(item)
    };
  }

  private getValidations(item: Metadata): ValidatorFn[] {
    let validations: ValidatorFn[] = [];
    if (item.isRequired) {
      let requiredValidation: any = {
        name: 'required',
        validator: Validators.required,
        message: `${item.fieldName} is required`
      };
      validations.push(requiredValidation);
    }
    return validations;
  }
}
