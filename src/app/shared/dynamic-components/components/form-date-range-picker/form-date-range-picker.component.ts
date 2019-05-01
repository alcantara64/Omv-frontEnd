import { Component, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../field.interface';
import { FieldConfiguration } from '../../field-setting';

@Component({
  selector: 'form-date-range-picker',
  templateUrl: './form-date-range-picker.component.html',
  styleUrls: ['./form-date-range-picker.component.css']
})
export class FormDateRangePickerComponent implements Field {

  config: FieldConfiguration;
  group: FormGroup;
  allowDeleting: boolean;
  deleteControl = new EventEmitter<any>();
  eventChange = new EventEmitter<any>();

  change(event: any) {    
    this.eventChange.emit(event);
  }

  deleteControlEvent(config: any) {
    this.deleteControl.emit(config);
  }
}
