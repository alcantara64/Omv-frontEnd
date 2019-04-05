import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from '../field.interface';

@Component({
  selector: "app-select",
  template: `
    <form class="col-md-4" [formGroup]="group">
      <label class="form-label">{{ field.label }}</label>
      <select class="form-control form-control-lg" [formControlName]="field.name">
        <option *ngFor="let item of field.options" [value]="item.value">{{item.text}}</option>
      </select>
    </form>
`,
  styles: []
})
export class SelectComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
