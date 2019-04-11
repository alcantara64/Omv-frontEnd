import { FormGroup } from '@angular/forms';
import { FieldConfiguration } from './field-setting';
import { EventEmitter } from '@angular/core';

export interface Field {
  config: FieldConfiguration,
  group: FormGroup,
  showDelete: boolean,
  remove: EventEmitter<any>
}
