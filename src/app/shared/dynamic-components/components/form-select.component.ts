import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Field } from '../field.interface';
import { FieldConfig } from '../field-config.interface';

@Component({
  selector: "form-select",
  template: `
    <div [formGroup]="group">
      <label class="form-label">{{ config.label }}</label>
      <div style="display: flex;">
        <ejs-dropdownlist class="form-control form-control-lg" [dataSource]='config.options' [fields]='fields'
          [formControlName]="config.name" placeholder="'Please select'"></ejs-dropdownlist>
        <span class="e-icons e-delete" style="margin: 10px; color: #0097a9; font-size: 1.5em;"></span>
      </div>
    </div>
    <br />
`,
  styles: []
})
export class FormSelectComponent implements Field {
  config: FieldConfig;
  group: FormGroup;  
  fields: Object = { text: 'text', value: 'value' };
}
