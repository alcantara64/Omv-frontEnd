import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {Router} from "@angular/router";
import { Select, Store } from '@ngxs/store';
import { MediaState } from '../../state/media/media.state';
import { Observable } from 'rxjs';
import { GetMetadata, GetMediaItemFields, GetAllMediaItemFields, AddMediaItemField } from '../../state/media/media.action';
import { DynamicFormComponent } from 'src/app/shared/dynamic-components/components/dynamic-form.component';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { takeWhile } from 'rxjs/operators';
import { EmitType } from '@syncfusion/ej2-base';
import { FieldConfig } from 'src/app/shared/dynamic-components/field-config.interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-media-item-details',
  templateUrl: './media-item-details.component.html',
  styleUrls: ['./media-item-details.component.css']
})
export class MediaItemDetailsComponent implements OnInit, AfterViewInit {
  public isPDF = true;

  public service: string = 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer';
  public document: string = 'PDF_Succinctly.pdf';

  componentActive = true;

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  fields: FieldConfig[] = [];
  @Select(MediaState.getMetaData) metadata$: Observable<any[]>;
  @Select(MediaState.getAllItemFields) allItemFields$: Observable<any[]>;
  @Select(MediaState.getItemFields) itemFields$: Observable<any[]>;

  @ViewChild('fieldsDialog') fieldsDialog: DialogComponent;
  
  itemFields: Object = { text: 'label', value: 'name' };
  fieldItem: any;
  allItemFields: any[];

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new GetMediaItemFields(0));
    this.store.dispatch(new GetAllMediaItemFields(0));

    this.itemFields$.subscribe(data => {
      this.fields = data;
    }), takeWhile(() => this.componentActive);

    this.allItemFields$.subscribe(data => {
      this.allItemFields = data;
    }), takeWhile(() => this.componentActive);
  }

  ngAfterViewInit() {
    if (!this.form) return;
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });

    // this.form.setDisabled('submit', true);
    // this.form.setValue('name', 'Todd Motto');
  }
  
  submit(value?: any) {
    console.log('submit form: ', this.form.value);
    console.log('submit is Form valid: ', this.form.valid);
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
    this.fieldsDialog.hide();
  }

  addField() {
    console.log('MediaItemDetailsComponent - addField - fieldItem: ', this.fieldItem);

    this.fields = null;

    let itemField = this.allItemFields.find(x => x.name === this.fieldItem);
    console.log('MediaItemDetailsComponent - addField -  itemField: ', itemField);

    // this.store.dispatch(new AddMediaItemField(itemField));

    this.form.form.addControl('dob', new FormControl(''));
    this.form.form.addControl('newOne', new FormControl(''));

    this.closeDialog();
  }
}
