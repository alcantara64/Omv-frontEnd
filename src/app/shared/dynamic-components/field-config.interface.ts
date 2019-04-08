import { ValidatorFn } from '@angular/forms';

export class FieldConfig {
  disabled?: boolean;
  label?: string;
  name: string;
  options?: string[];
  order?: number;
  placeholder?: string;
  type: string;
  inputType?: string;
  isSelected?: boolean;
  isChecked?: boolean;
  validations?: ValidatorFn[];
  value?: any;
}

export class Validator {
  name: string;
  validator: any;
  message: string;
}
