import { Injectable } from "@angular/core";
import { FieldConfig, Validator } from 'src/app/shared/dynamic-components/field-config.interface';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MediaItemDetailsService {

  fields: FieldConfig[] = [];
  metadataFields: any[] = [];
  itemDetails: any;

  constructor() {}

  getAllFields(metadata: any[]) {
    let allFields = [];
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
      allFields.push(field);
    });

    this.metadataFields = allFields;
    return this.metadataFields;
  }

  buildFields(metadata: any[], item: any) {
    if (metadata.length < 1 || !item) return;
    let allFields = [];
    let itemFields = Object.keys(item);
    console.log('MediaItemDetailsService - buildFields - itemFields: ', itemFields);
    metadata.forEach(data => {
      let field: FieldConfig;
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
        this.fields.push(field);
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
        labelControl.label = name.charAt(0).toUpperCase() + name.slice(1);
        labelControl.value = item[name];
        this.fields.push(labelControl);
      });      
    }    
    console.log('MediaItemDetailsService - buildFields - fields: ', this.fields);

    this.metadataFields = allFields;
    return this.fields;
  }

  addField(config: FieldConfig) {
    this.fields.push(config);
    this.metadataFields.map(x => {
      if (x.name === config.name) {
        x.isChecked = true;
        x.isSelected = false;
      }
    });
  }

  removeField(name: string) {
    this.fields = this.fields.filter(x => x.name !== name);
    this.metadataFields.map(x => {
      if (x.name === name) {
        x.isChecked = false;
        x.isSelected = false;
      }
    });
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
      options: item.options,
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