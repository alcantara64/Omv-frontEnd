import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit, ViewContainerRef, EventEmitter, Output, Type, OnChanges } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormSelectComponent } from '../components/form-select.component';
import { FormInputComponent } from '../components/form-input.component';
import { FormDateComponent } from '../components/date.component';
import { Field } from '../field.interface';
import { FieldConfig } from '../field-config.interface';

const components: {[type: string]: Type<Field>} = {
  input: FormInputComponent,
  select: FormSelectComponent,
  date: FormDateComponent
};

@Directive({
  selector: "[dynamicField]"
})
export class DynamicFieldDirective implements Field, OnChanges, OnInit {
  @Input() config: FieldConfig;
  @Input() group: FormGroup;
  component: ComponentRef<Field>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
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
  }
}
