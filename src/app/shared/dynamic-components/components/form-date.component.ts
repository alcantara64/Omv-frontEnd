import { Component, OnInit, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Field } from '../field.interface';
import { FieldConfiguration } from '../field-setting';

@Component({
  selector: "form-date",
  template: `
    <div class="" [formGroup]="group">
      <label class="form-label">{{ config.label }}</label>
      <div style="display: flex;">
        <ejs-datepicker class="col-md-11" placeholder="{{ config.label }}" [formControlName]="config.name"></ejs-datepicker>  
        <button type="button" class="o-delete col-md-1" (click)="deleteControlEvent(config)" *ngIf="!config.isRequired && allowDeleting">
          <span class="e-icons e-delete"></span>
        </button>
      </div>
      <ng-container *ngFor="let validation of config.validations;">
        <label class="form-description" *ngIf="group.get(config.name).hasError(validation.name) && (group.get(config.name).touched || group.get(config.name).dirty)">
          {{validation.message}}
        </label>
      </ng-container>
    </div>
    <br/>
`,
  styles: []
})
export class FormDateComponent implements Field {
  config: FieldConfiguration;
  group: FormGroup;
  allowDeleting: boolean;  
  deleteControl = new EventEmitter<any>();

  deleteControlEvent(config: any) {
    this.deleteControl.emit(config);
  }
}
