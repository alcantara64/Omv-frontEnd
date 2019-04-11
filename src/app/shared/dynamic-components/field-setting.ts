import { ValidatorFn } from '@angular/forms';
import { ListItem } from 'src/app/core/models/entity/list-item';

export class FieldConfiguration {
  disabled?: boolean;
  label?: string;
  name: string;
  options?: ListItem[];
  optionsId?: number;
  order?: number;
  placeholder?: string;
  type: string;
  inputType?: string;
  isSelected?: boolean;
  isChecked?: boolean;
  validations?: ValidatorFn[];
  value?: any;
}

export class FieldValidator {
  name: string;
  validator: any;
  message: string;
}
