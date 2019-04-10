import { ValidatorFn } from '@angular/forms';

export class FieldConfiguration {
  disabled?: boolean;
  label?: string;
  name: string;
  options?: any[];
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
