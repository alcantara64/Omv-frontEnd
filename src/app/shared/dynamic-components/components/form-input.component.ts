import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Field } from '../field.interface';
import { FieldConfig } from '../field-config.interface';

@Component({
  selector: "form-input",
  template: `
    <div [formGroup]="group">
      <label class="form-label">{{ config.label }}</label>
      <div style="display: flex;">
        <input class="form-control form-control-lg" [formControlName]="config.name" 
          [placeholder]="config.placeholder">    
        <button>
          <span class="e-icons e-delete" style="margin: 10px; color: #0097a9; font-size: 1.5em;"></span>
        </button>
      </div>
      <ng-container *ngFor="let validation of config.validation;">
        <label class="form-description" 
          *ngIf="!group.get(config.name).valid">
          {{validation.message}} Testing
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
}
