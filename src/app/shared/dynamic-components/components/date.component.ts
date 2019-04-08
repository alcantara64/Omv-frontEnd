import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from '../field.interface';

@Component({
  selector: "app-date",
  template: `
    <div class="" [formGroup]="group">
      <label class="form-label">{{ field.label }}</label>
      <div style="display: flex;">
        <ejs-datepicker class="" strictMode='true' placeholder="{{field.label}}" [formControlName]="field.name"></ejs-datepicker>  
        <span class="e-icons e-delete" style="margin: 10px; color: #0097a9; font-size: 1.5em;"></span>
      </div>      
      <ng-container *ngFor="let validation of field.validations;">
        <label class="form-description" 
          *ngIf="group.get(field.name).hasError(validation.name) && (group.get(field.name).dirty || group.get(field.name).touched)">
          {{validation.message}}
        </label>
      </ng-container>
    </div>
    <br/>
`,
  styles: []
})
export class DateComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
