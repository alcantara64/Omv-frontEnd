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
        <ejs-datepicker class="" strictMode='true' placeholder="{{config.label}}" [formControlName]="config.name"></ejs-datepicker>  
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
export class FormDateComponent implements Field {
  config: FieldConfiguration;
  group: FormGroup;
  showDelete: boolean;
  remove = new EventEmitter<any>();

  performRemove(config: any) {
    this.remove.emit(config);
  }
}
