import { Injectable } from '@angular/core';
import { MediaDataService } from 'src/app/core/services/data/media/media.data.service';
import { map, mergeMap } from 'rxjs/operators';
import { FieldConfig } from './field.interface';
import { Observable, of } from 'rxjs';
import { Validators } from '@angular/forms';

@Injectable()
export class MetadataService {

  constructor(private mediaDataService: MediaDataService) { }

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
        let _item: any;
        switch(item.type) {
          case 'text':
            _item = this.buildTextBox(item);
            break;
          case 'select':
            _item = this.buildDropdown(item);
            break;
          case 'date':
            _item = this.buildDate(item);
            break;
        }        
        metaArray.push(_item);
      });
    }    
    console.log('testing select: ', metaArray);

    return await metaArray;
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
      validations: this.getValidations(item)
    };
  }

  private buildDropdown(item: any) {
    return {
      type: "select",
      label: item.label,
      name: item.name,
      value: item.value ? item.value : '',
      optionsId: item.optionsId,
      options: [],
      validations: this.getValidations(item)
    };
  }

  private buildDate(item: any) {
    return {
      type: "date",
      label: item.label,
      name: item.name,
      validations: this.getValidations(item)
    };
  }

  private getValidations(item: any): any[] {
    let validations = [];
    if (item.isRequired) {
      let requiredValidation = {
        name: "required",
        validator: Validators.required,
        message: `${item.label} is required`
      };
      validations.push(requiredValidation);
    }
    return validations;
  }
}
