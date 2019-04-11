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
        <label class="form-control-label"> {{ config.value }} </label>
      </div>
    </div>
    <br/>
      `,
  styles: []
})
export class FormLabelComponent implements Field {
  config: FieldConfiguration;
  group: FormGroup;
  showDelete: boolean;
  remove = new EventEmitter<any>();

  performRemove(config: any) {
    this.remove.emit(config);
  }
}
