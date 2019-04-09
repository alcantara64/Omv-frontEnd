import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { Select, Store } from '@ngxs/store';
import { GetMediaItemDetails, GetItemMetadata, AddMediaItemField, RemoveMediaItemField, GetMetadata } from '../../state/media/media.action';
import { MediaState } from '../../state/media/media.state';
import { Observable } from 'rxjs';
import { DynamicFormComponent } from 'src/app/shared/dynamic-components/components/dynamic-form.component';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { takeWhile } from 'rxjs/operators';
import { EmitType } from '@syncfusion/ej2-base';
import { FieldConfig } from 'src/app/shared/dynamic-components/field-config.interface';
import { FormBuilder } from '@angular/forms';
import { MediaItemDetailsService } from './media-item-details.service';

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
  @Select(MediaState.getMetaData) metadata$: Observable<any[]>;
  @Select(MediaState.getItemFields) itemFields$: Observable<any[]>;
  @Select(MediaState.getCurrentMediaItem) itemDetails$: Observable<any[]>;

  @ViewChild('fieldsDialog') fieldsDialog: DialogComponent;
  @ViewChild('listview') element:any;
  
  itemFields: Object = { text: 'label', value: 'name' };
  fieldItem: any;
  allItemFields: any[];
  itemDetails: any;
  metadata: any;
  selectedFields: FieldConfig[] = [];

  constructor(private store: Store, private router: Router, private fb: FormBuilder, private mediaItemDetailsService: MediaItemDetailsService) {
    this.allItemFields = this.mediaItemDetailsService.metadataFields;
    this.fields = this.mediaItemDetailsService.fields;
   }

  ngOnInit() {
    this.store.dispatch(new GetItemMetadata(1));
    this.store.dispatch(new GetMediaItemDetails(4));
    this.store.dispatch(new GetMetadata(0));

    this.metadata$.subscribe(data => {
      this.metadata = data;
      this.allItemFields = this.mediaItemDetailsService.getAllFields(data);
      this.fields = this.mediaItemDetailsService.buildFields(this.metadata, this.itemDetails);
      console.log('MediaItemDetailsComponent ngOnInit metadata- fields: ', this.fields);
      console.log('MediaItemDetailsComponent ngOnInit metadata- allItemFields: ', this.allItemFields);
    }), takeWhile(() => this.componentActive);

    this.itemDetails$.subscribe(data => {
      this.itemDetails = data;
      console.log('MediaItemDetailsComponent ngOnInit fields: ', this.fields);
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
      this.mediaItemDetailsService.addField(field);
      this.fields = this.mediaItemDetailsService.fields;
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
    this.mediaItemDetailsService.removeField(item.name);
    this.fields = this.mediaItemDetailsService.fields;
  }
}
