import { Injectable } from "@angular/core";
import { FieldConfig, Validator } from 'src/app/shared/dynamic-components/field-config.interface';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MediaItemDetailsService {

  fields: FieldConfig[] = [];
  metadata: any[] = [];
  itemDetails: any;

  constructor() {}

  buildFields(metadata: any[], item: any) {
    if (metadata.length < 1 || !item) return;
    let allFields = [];
    let itemFields = Object.keys(item);
    console.log('MediaItemDetailsService - buildFields - itemFields: ', itemFields);
    metadata.forEach(data => {
      let field: any;
      switch(data.type) {
        case 'text':
          field = this.buildTextBox(data);
          break;
        case 'select':
          field = this.buildDropdown(data);
          break;
        case 'date':
          field = this.buildDate(data);
          break;
        case 'label':
          field = this.buildLabel(data);
          break;
      }
      if (itemFields.includes(data.name)) {
        this.fields.push(data);
      }
      allFields.push(field);
    });
    if (itemFields.length !== this.fields.length) {
      const otherFields = itemFields.filter(_item => this.fields.map(x => x.name).indexOf(_item) <= -1);
      console.log('MediaItemDetailsService - buildFields - otherFields: ', otherFields);
      otherFields.forEach(name => {
        let labelControl = new FieldConfig();
        labelControl.type = 'label';
        labelControl.name = name,
        labelControl.label = item[name];
        labelControl.value = item[name];
        this.fields.push(labelControl);
      });      
    }    
    console.log('MediaItemDetailsService - buildFields - fields: ', this.fields);

    return this.fields;
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