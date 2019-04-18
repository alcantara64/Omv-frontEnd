import { ValidatorFn } from '@angular/forms';
import { ListItem } from 'src/app/core/models/entity/list-item';

export class FieldConfiguration {
  cssClass? = 'col-md-12';
  disabled?: boolean;
  label?: string;
  inputType?: string;
  isChecked?: boolean;
  isRequired?: boolean;
  isSelected?: boolean;
  name: string;
  options?: ListItem[];
  optionsId?: number;
  order?: number;
  placeholder?: string;
  type: string;
  validations?: ValidatorFn[];
  value?: any;
}

export class FieldValidator {
  name: string;
  validator: any;
  message: string;
}
