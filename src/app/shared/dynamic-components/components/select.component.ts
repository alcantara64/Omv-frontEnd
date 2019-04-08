import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from '../field.interface';

@Component({
  selector: "app-select",
  template: `
    <div [formGroup]="group">
      <label class="form-label">{{ field.label }}</label>
      <div style="display: flex;">
        <ejs-dropdownlist class="form-control form-control-lg" [dataSource]='field.options' [fields]='fields' [formControlName]="field.name"
          placeholder="'Please select a {{field.label}}"></ejs-dropdownlist>
        <span class="e-icons e-delete" style="margin: 10px; color: #0097a9; font-size: 1.5em;"></span>
      </div>
      <ng-container *ngFor="let validation of field.validations;">
        <label class="form-description" 
          *ngIf="group.get(field.name).hasError(validation.name) && (group.get(field.name).touched)">
          {{validation.message}}
        </label>
      </ng-container>
    </div>
    <br />
`,
  styles: []
})
export class SelectComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;  
  fields: Object = { text: 'text', value: 'value' };

  constructor() {}
  ngOnInit() {}  
}
