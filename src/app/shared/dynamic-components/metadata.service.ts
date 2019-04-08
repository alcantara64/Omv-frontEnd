import { Injectable } from '@angular/core';
import { MediaDataService } from 'src/app/core/services/data/media/media.data.service';
import { map } from 'rxjs/operators';
import { Validators } from '@angular/forms';
import { Validator, FieldConfig } from './field-config.interface';

@Injectable()
export class MetadataService {

  constructor(private mediaDataService: MediaDataService) { }

  async getDirectoryMetadata(directoryId?: number): Promise<any[]> {
    let data = await this.mediaDataService.getMetadata(directoryId).toPromise();
    data.forEach(async item => {
      if (item.type === 'select') {
        item.options = await this.getOptions(item.optionsId).toPromise();
      }
    });
    return data;
  }

  async getFinalData() {
    let data = await this.getMetadata();
    data.forEach(async item => {
      if (item.type === 'select') {
        item.options = await this.getOptions(item.optionsId).toPromise();        
      }
    });
    return data;
  }

  async getMetadata() {
    let metaArray = [];
    let items = await this.mediaDataService.getMetadata(1).toPromise();
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
    console.log('testing select: ', metaArray);

    return await metaArray.sort(x => x.order);
  }

  private getOptions(id: any) {
    return this.mediaDataService.getMetadataOptions(id).pipe(
      map(items => {
        let options = [];
        items.forEach(res => {
          let option = { "value": res.key, "text": res.value };
          options.push(option);
        });
        return options;
      })
    );
  }

  private buildTextBox(item: any): any {
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

  private buildLabel(item: any): any {
    return {
      type: "label",
      label: item.label,
      name: item.name,
      order: item.order
    };
  }

  private buildDropdown(item: any) {
    return {
      type: "select",
      label: item.label,
      name: item.name,
      order: item.order,
      optionsId: item.optionsId,
      options: [],
      placeholder: 'Select an option',
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
        name: 'required',
        validator: Validators.required,
        message: `${item.label} is required`
      };

      validations.push(requiredValidation);
    }
    return validations;
  }
}
