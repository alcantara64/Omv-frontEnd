import { Component, OnInit, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Field } from '../field.interface';
import { FieldConfiguration } from '../field-setting';

@Component({
  selector: "form-combobox",
  template: `
    <div [formGroup]="group">
      <label class="form-label">{{ config.label }}</label>
      <div style="display: flex;">
        <ejs-combobox id='combo' #local 
          class="form-control form-control-lg col-md-11"
          [dataSource]='config.options' 
          [autofill]='true' 
          [fields]='fields' 
          [placeholder]='config.placeholder'
          popupHeight='250px'
          [(value)]="config.value">
        </ejs-combobox>

        
        <button type="button" class="o-delete col-md-1" (click)="deleteControlEvent(config)" *ngIf="!config.isRequired && allowDeleting">
          <span class="e-icons e-delete"></span>
        </button>
      </div>
      <ng-container *ngFor="let validation of config.validations;">
        <label class="form-description" *ngIf="group.get(config.name).hasError(validation.name) && (group.get(config.name).touched)">
          {{validation.message}}
        </label>
      </ng-container>
    </div>
    <br />
`,
  styles: []
})
export class FormComboBoxComponent implements Field {
  config: FieldConfiguration;
  group: FormGroup;
  allowDeleting: boolean;
  fields: Object = { text: 'description', value: 'value' };
  deleteControl = new EventEmitter<any>();

  deleteControlEvent(config: any) {
    this.deleteControl.emit(config);
  }
}
