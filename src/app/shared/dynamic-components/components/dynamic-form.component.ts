import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldConfiguration } from '../field-setting';

@Component({
  exportAs: "dynamicForm",
  selector: "dynamic-form",
  template: `
    <form [formGroup]="form" (submit)="handleSubmit($event)">     
      <ng-container *ngFor="let field of config;" dynamicField (remove)="performRemove($event)" [config]="field" [group]="form" [showDelete]="showDelete">
      </ng-container>      
    </form>
  `,
  styles: []
})
export class DynamicFormComponent implements OnChanges, OnInit {
  @Input() config: FieldConfiguration[] = [];
  @Input() showDelete: boolean;

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
  @Output() formFinished = new EventEmitter<any>();

  form: FormGroup = this.fb.group({});

  get controls() { return this.config.filter(({ type }) => type !== 'button'); }
  get changes() { return this.form.valueChanges; }
  get formChange() { return this.form; }
  get valid() {
     return this.form.valid;
     }
  get value() { return this.form.value; }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.createGroup();
    console.log('DynamicFormComponent - ngOnInit', this.form);
  }

  ngOnChanges() {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map((item) => item.name);

      controls
        .filter((control) => !configControls.includes(control))
        .forEach((control) => this.form.removeControl(control));

      configControls
        .filter((control) => !controls.includes(control))
        .forEach((name) => {
          const config = this.config.find((control) => control.name === name);
          this.form.addControl(name, this.createControl(config));
        });
      console.log('DynamicFormComponent - ngOnChanges if', this.form);
    }
  }

  onFormFinished(event: any) {
    console.log('DynamicFormComponent - onFormFinished: ', event);
  }

  createGroup() {
    const group = this.fb.group({});
    this.controls.forEach(control => group.addControl(control.name, this.createControl(control)));
    console.log('DynamicFormComponent - createGroup ', group);
    return group;
  }

  createControl(config: FieldConfiguration) {
    const { disabled, validations, value } = config;
    return this.fb.control(value, this.bindValidations(validations || []));
  }

  addControl(config: FieldConfiguration) {
    const control = this.createControl(config);
    this.form.addControl(config.name, control);
  }

  removeControl(name: string) {
    this.form.removeControl(name);
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.submit.emit(this.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  setDisabled(name: string, disable: boolean) {
    if (this.form.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      this.form.controls[name][method]();
      return;
    }

    this.config = this.config.map((item) => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }

  setValue(name: string, value: any) {
    this.form.controls[name].setValue(value, { emitEvent: true });
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  performRemove(config: any) {
    this.remove.emit(config);
  }
}
