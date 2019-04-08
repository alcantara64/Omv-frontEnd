import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Field } from '../field.interface';
import { FieldConfig } from '../field-config.interface';

@Component({
  selector: "form-date",
  template: `
    <div class="" [formGroup]="group">
      <label class="form-label">{{ config.label }}</label>
      <div style="display: flex;">
        <ejs-datepicker class="" strictMode='true' placeholder="{{config.label}}" [formControlName]="config.name"></ejs-datepicker>  
        <span class="e-icons e-delete" style="margin: 10px; color: #0097a9; font-size: 1.5em;"></span>
      </div>  
    </div>
    <br/>
`,
  styles: []
})
export class FormDateComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
