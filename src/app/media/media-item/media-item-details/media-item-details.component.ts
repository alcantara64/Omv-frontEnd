import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import {Router} from "@angular/router";
import { Select, Store } from '@ngxs/store';
import { MediaState } from '../../state/media/media.state';
import { Observable } from 'rxjs';
import { GetMetadata, GetItemMetadata, AddMediaItemField, RemoveMediaItemField } from '../../state/media/media.action';
import { DynamicFormComponent } from 'src/app/shared/dynamic-components/components/dynamic-form.component';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { takeWhile } from 'rxjs/operators';
import { EmitType } from '@syncfusion/ej2-base';
import { FieldConfig } from 'src/app/shared/dynamic-components/field-config.interface';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-media-item-details',
  templateUrl: './media-item-details.component.html',
  styleUrls: ['./media-item-details.component.css']
})
export class MediaItemDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  public isPDF = true;

  public service: string = 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer';
  public document: string = 'PDF_Succinctly.pdf';

  componentActive = true;

  @ViewChild(DynamicFormComponent) dynamicForm: DynamicFormComponent;

  fields: FieldConfig[] = [];
  @Select(MediaState.getCurrentItemMetadata) metadata$: Observable<any[]>;
  @Select(MediaState.getItemFields) itemFields$: Observable<any[]>;

  @ViewChild('fieldsDialog') fieldsDialog: DialogComponent;
  @ViewChild('listview') element:any;
  
  itemFields: Object = { text: 'label', value: 'name' };
  fieldItem: any;
  allItemFields: any[];
  selectedFields: FieldConfig[] = [];

  constructor(private store: Store, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.store.dispatch(new GetItemMetadata(0));

    this.itemFields$.subscribe(data => {
      this.fields = data;
    }), takeWhile(() => this.componentActive);

    this.metadata$.subscribe(data => {
      this.allItemFields = data;
      console.log('MediaItemDetailsComponent ngOnInit allItemFields: ', this.allItemFields);
    }), takeWhile(() => this.componentActive);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  ngAfterViewInit() {
    if (!this.dynamicForm) return;
    let previousValid = this.dynamicForm.valid;
    this.dynamicForm.changes.subscribe(() => {
      if (this.dynamicForm.valid !== previousValid) {
        previousValid = this.dynamicForm.valid;
        this.dynamicForm.setDisabled('submit', !previousValid);
      }
    });
  }
  
  submit(value?: any) {
    console.log('submit form: ', this.dynamicForm.value);
    console.log('submit is Form valid: ', this.dynamicForm.valid);
  }

  activatePDFViewer() {
    this.router.navigate(['pdf-viewer', {service: this.service, document: this.document }]);
  }

  doneDialogClick: EmitType<object> = () => {
    this.fieldsDialog.hide();
  }

  doneDialogButtons: Object[] = [{ click: this.doneDialogClick.bind(this),
                    buttonModel: { content: 'Done', isPrimary: true } }];

  showFieldsDialog() {
    this.fieldsDialog.show();
  }

  closeDialog() {
    this.clearSelectedFields();
    this.fieldsDialog.hide();
  }

  clearSelectedFields() {
    this.allItemFields.map(field => field.isSelected = false);
    this.selectedFields = [];
  }

  addFields() {
    this.selectedFields.forEach(field => {
      this.dynamicForm.addControl(field);
      this.store.dispatch(new AddMediaItemField(field));  
    });
    this.closeDialog();
  }

  selectField(item) {
    if (item.isChecked) return;
    this.allItemFields.map(x => {
      if (x.name === item.name) {
        x.isSelected = !x.isSelected;
        if (x.isSelected) {
          this.selectedFields.push(x);
        } else {
          this.selectedFields = this.selectedFields.filter(x => x.name !== item.name);
        }
      }
    });
  }

  performRemove(item: any) {
    this.dynamicForm.removeControl(item.name);
    this.store.dispatch(new RemoveMediaItemField(item.name));
  }
}
