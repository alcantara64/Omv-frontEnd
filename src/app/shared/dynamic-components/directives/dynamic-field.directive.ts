import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit, ViewContainerRef, EventEmitter, Output, Type, OnChanges } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormSelectComponent } from '../components/form-select.component';
import { FormInputComponent } from '../components/form-input.component';
import { FormDateComponent } from '../components/form-date.component';
import { Field } from '../field.interface';
import { FieldConfiguration } from '../field-setting';
import { FormLabelComponent } from '../components/form-label.component';
import { FormComboBoxComponent } from '../components/form-combobox.component/form-combobox.component';
import { FormDateRangePickerComponent } from '../components/form-date-range-picker/form-date-range-picker.component';

const components: {[type: string]: Type<Field>} = {
  input: FormInputComponent,
  select: FormSelectComponent,
  date: FormDateComponent,
  label: FormLabelComponent,
  combobox: FormComboBoxComponent,
  dateRange: FormDateRangePickerComponent
};

@Directive({
  selector: "[dynamicField]"
})
export class DynamicFieldDirective implements Field, OnChanges, OnInit {
  @Input() config: FieldConfiguration;
  @Input() group: FormGroup;
  @Input() allowDeleting: boolean;
  @Output() deleteControl = new EventEmitter<any>();
  @Output() dropdownChange = new EventEmitter<any>();

  component: ComponentRef<Field>;

  constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) {}

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
      this.component.instance.allowDeleting = this.allowDeleting;
      this.component.instance.deleteControl = this.deleteControl;
      this.component.instance.dropdownChange = this.dropdownChange;
    }
  }

  ngOnInit() {    
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<Field>(components[this.config.type]);
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
    this.component.instance.allowDeleting = this.allowDeleting;
    this.component.instance.deleteControl = this.deleteControl;
    this.component.instance.dropdownChange = this.dropdownChange;
  }
}
