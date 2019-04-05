import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from '../field.interface';

@Component({
  selector: "app-input",
  template: `
        <form [formGroup]="group">
          <div class="form-group">
            <label class="form-label">{{ field.label }}</label>
            <input class="form-control form-control-lg" [formControlName]="field.name" [placeholder]="field.label" [type]="field.inputType">    
            <span class="invalid-feedback">
              <h5 class="form-description"> Please enter {{ field.label }} </h5>
            </span>
          </div>  
        </form> 
      `,
  styles: []
})
export class InputComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
