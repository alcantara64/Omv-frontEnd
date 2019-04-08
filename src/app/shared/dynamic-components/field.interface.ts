import { FormGroup } from '@angular/forms';
import { FieldConfig } from './field-config.interface';
import { EventEmitter } from '@angular/core';

export interface Field {
  config: FieldConfig,
  group: FormGroup,
  showDelete: boolean,
  remove: EventEmitter<any>
}
