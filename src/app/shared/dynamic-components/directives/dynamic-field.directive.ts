import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit, ViewContainerRef, EventEmitter, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from '../field.interface';
import { SelectComponent } from '../components/select.component';
import { InputComponent } from '../components/input.component';
import { DateComponent } from '../components/date.component';

const componentMapper = {
  input: InputComponent,
  select: SelectComponent,
  date: DateComponent
};
@Directive({
  selector: "[dynamicField]"
})
export class DynamicFieldDirective implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  @Output() action = new EventEmitter<any>();
  componentRef: any;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}
  ngOnInit() {    
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.field.type]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
  }

  performAction(value?: any) {
    console.log('DynamicFieldDirective - performAction: ', value);
    this.action.emit(value);
  }
}
