import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from '../field.interface';

@Component({
  selector: "app-input",
  template: `
    <div [formGroup]="group">
      <label class="form-label">{{ field.label }}</label>
      <div style="display: flex;">
        <input id="field.name" class="form-control form-control-lg" [formControlName]="field.name" [placeholder]="field.label" [type]="field.inputType">    
        <span class="e-icons e-delete" (click)="doSomething(field.name)" style="margin: 10px; color: #0097a9; font-size: 1.5em;"></span>
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
export class InputComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  @Output() action = new EventEmitter<any>();
  constructor() {}
  ngOnInit() {}

  doSomething(value?: any) {
    console.log('InputComponent: ', value);
    this.action.emit(value);
  }
}
