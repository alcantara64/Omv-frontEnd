import { FormGroup } from '@angular/forms';
import { FieldConfiguration } from './field-setting';
import { EventEmitter } from '@angular/core';

export interface Field {
  config: FieldConfiguration,
  group: FormGroup,
  allowDeleting: boolean,
  deleteControl?: EventEmitter<any>,
  dropdownChange?: EventEmitter<any>,
  eventChange?: EventEmitter<any>
}
