import { Component, OnInit, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Field } from '../field.interface';
import { FieldConfiguration } from '../field-setting';

@Component({
  selector: "form-select",
  template: `
    <div [formGroup]="group">
      <label class="form-label">{{ config.label }}</label>
      <div style="display: flex;">
        <ejs-dropdownlist class="form-control form-control-lg" [dataSource]='config.options' [fields]='fields' [(value)]="config.itemValue"
          [formControlName]="config.name" placeholder="'Please select'"></ejs-dropdownlist>
        <button type="button" class="form-delete" (click)="performRemove(config)" *ngIf="showDelete">
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
export class FormSelectComponent implements Field {
  config: FieldConfiguration;
  group: FormGroup;  
  showDelete: boolean;
  remove = new EventEmitter<any>();
  fields: Object = { text: 'itemDescription', value: 'itemValue' };

  performRemove(config: any) {
    this.remove.emit(config);
  }
}
