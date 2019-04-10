import { Injectable } from "@angular/core";
import { MediaDataService } from "src/app/core/services/data/media/media.data.service";
import { Validators } from "@angular/forms";
import { FieldConfig, Validator } from "src/app/shared/dynamic-components/field-config.interface";
import { map } from "rxjs/operators";
import { DirectoryDataService } from 'src/app/core/services/data/directory/directory.data.service';
import { MetadataDataService } from 'src/app/core/services/data/metadata/metadata.data.service';

@Injectable({
  providedIn: "root"
})
export class MediaUploadService {

  constructor(private directoryDataService: DirectoryDataService, private metadataDataService: MetadataDataService) {}

  async getDirectoryMetadata(directoryId: number) {
    let metaArray = [];
    let items = await this.directoryDataService.getMetadata(directoryId).toPromise();
    if (items) {
      items.forEach(async item => {
        let field: any; 
        switch(item.type) {
          case 'text':
            field = this.buildTextBox(item);
            break;
          case 'select':
            field = this.buildDropdown(item);
            break;
          case 'date':
            field = this.buildDate(item);
            break;
          case 'label':
            field = this.buildLabel(item);
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

  private getOptions(id: number) {
    return this.metadataDataService.getListOptions(id).pipe(
      map(items => {
        let options = [];
        items.forEach(res => {
          let option = { value: res.key, text: res.value };
          options.push(option);
        });
        return options;
      })
    );
  }

  private buildTextBox(item: any): FieldConfig {
    return {
      type: "input",
      label: item.label,
      inputType: "text",
      name: item.name,
      order: item.order,
      placeholder: item.label,
      validations: this.getValidations(item)
    };
  }

  private buildLabel(item: any): FieldConfig {
    return {
      type: "label",
      label: item.label,
      name: item.name,
      order: item.order
    };
  }

  private buildDropdown(item: any): any {
    return {
      type: "select",
      label: item.label,
      name: item.name,
      order: item.order,
      optionsId: item.optionsId,
      options: item.options,
      placeholder: "Select an option",
      validations: this.getValidations(item)
    };
  }

  private buildDate(item: any) {
    return {
      type: "date",
      label: item.label,
      name: item.name,
      order: item.order,
      validations: this.getValidations(item)
    };
  }

  private getValidations(item: any): any[] {
    let validations = [];
    if (item.isRequired) {
      let requiredValidation: Validator = {
        name: "required",
        validator: Validators.required,
        message: `${item.label} is required`
      };
      validations.push(requiredValidation);
    }
    return validations;
  }
}
