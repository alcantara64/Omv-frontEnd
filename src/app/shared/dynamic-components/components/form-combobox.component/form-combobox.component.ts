import { Component, OnInit, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Field } from '../../field.interface';
import { FieldConfiguration } from '../../field-setting';

@Component({
  selector: "form-combobox",
  template: `
    <div [formGroup]="group">
      <label class="form-label">{{ config.label }}</label>
      <div style="display: flex;">
        <ejs-combobox id='combo' #local 
            class="form-control form-control-lg col-md-11"
            [dataSource]='config.options' 
            [autofill]='true' 
            [fields]='fields' 
            [placeholder]='config.placeholder'
            popupHeight='180px'
            [(value)]="config.value"
            (close)="hidePopup($event)"
            (change)="dropdownChangeEvent($event)">
          <ng-template #itemTemplate let-data>
            <div class="combobox-item-row" style="cursor: pointer;">          
              <span [ngClass]="{'label-14-bold-source-sans-pro': data.isSelected, 'label-14-source-sans-pro': !data.isSelected}"> 
                {{ data.description }} 
              </span>
              <img *ngIf="data.isSelected" 
                    src="../../../../assets/images/checkmark.svg" 
                    class="combobox-item-image"
                />
            </div>
          </ng-template>
        </ejs-combobox>

        <button type="button" class="o-delete col-md-1" (click)="deleteControlEvent(config)" *ngIf="!config.isRequired && allowDeleting">
          <span class="e-icons e-delete"></span>
        </button>
      </div>
      <ng-container *ngFor="let validation of config.validations;">
        <label class="form-description" *ngIf="group.get(config.name).hasError(validation.name) && (group.get(config.name).touched)">
          {{validation.message}}
        </label>
      </ng-container>
    </div>
    <br />
  `,
  styleUrls: ['./form-combobox.component.css']
})
export class FormComboBoxComponent implements Field {
  config: FieldConfiguration;
  group: FormGroup;
  allowDeleting: boolean;
  fields: Object = { text: 'description', value: 'value' };
  deleteControl = new EventEmitter<any>();
  dropdownChange = new EventEmitter<any>();

  dropdownChangeEvent(event: any) {
    const name = this.config.label.toLowerCase();
    const data = event.itemData as any;
    if (data.isSelected) return;
    let someData = formData(data, name.charAt(0).toUpperCase() + name.slice(1));

    // data.fieldName = ;
    this.dropdownChange.emit(someData);
  }

  hidePopup(event: any) {
    console.log('FormComboBoxComponent hidePopup: ', event);
  }

  deleteControlEvent(config: any) {
    this.deleteControl.emit(config);
  }
}

export const formData = (data, name) => {
  return ({
      ...data,
      fieldName: name,
  });
 }


