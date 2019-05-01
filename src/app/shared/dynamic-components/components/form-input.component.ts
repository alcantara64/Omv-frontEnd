import { Component, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Field } from '../field.interface';
import { FieldConfiguration } from '../field-setting';

@Component({
  selector: "form-input",
  template: `
    <div [formGroup]="group">
      <label class="form-label">{{ config.label }}</label>
      <div style="display: flex;">
        <input class="form-control form-control-lg col-md-11" [formControlName]="config.name" [type]="config.inputType"
          [placeholder]="config.placeholder">    
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
export class FormInputComponent implements Field {
  config: FieldConfiguration;
  group: FormGroup;
  allowDeleting: boolean;
  deleteControl = new EventEmitter<any>();

  deleteControlEvent(config: any) {
    this.deleteControl.emit(config);
  }
}
