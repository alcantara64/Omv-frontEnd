import { Component, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Field } from '../field.interface';
import { FieldConfig } from '../field-config.interface';

@Component({
  selector: "form-input",
  template: `
    <div [formGroup]="group">
      <label class="form-label">{{ config.label }}</label>
      <div style="display: flex;">
        <input class="form-control form-control-lg" [formControlName]="config.name" [type]="config.inputType"
          [placeholder]="config.placeholder">    
        <button type="button" class="form-delete" (click)="performRemove(config)" *ngIf="showDelete">
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
  config: FieldConfig;
  group: FormGroup;
  showDelete: boolean;
  remove = new EventEmitter<any>();

  performRemove(config: any) {
    this.remove.emit(config);
  }
}
