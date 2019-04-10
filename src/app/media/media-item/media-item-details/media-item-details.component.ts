import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, AfterContentChecked, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
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
  public minDate: Date = new Date("05/07/2017");
  public maxDate: Date = new Date("05/27/2017");
  public value: Date = new Date("05/16/2017");
  id: any;
  @Select(MediaState.setMediaItemId) mediaId$: Observable<number>;

  componentActive = true;
  @ViewChild(DynamicFormComponent) dynamicForm: DynamicFormComponent;

  @Select(MediaState.setMediaItemId) mediaItemId$: Observable<number>;
  @Select(MediaState.getItemFields) itemFields$: Observable<any[]>;
  @Select(MediaState.getCurrentItemMetadata) currentItemMetadata$: Observable<any[]>;

  @ViewChild('fieldsDialog') fieldsDialog: DialogComponent;
  @ViewChild('listview') element: any;

  fields: FieldConfig[] = [];
  mediaItemId: number;
  itemFields: Object = { text: 'label', value: 'name' };
  fieldItem: any;
  allItemFields: any[];
  itemDetails: any;
  selectedFields: FieldConfig[] = [];

  isFormValid = false;

  constructor(private store: Store, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.mediaItemId$.subscribe(id => {
      if (id) {
        this.id = id;
        this.store.dispatch(new GetMetadata(id));
      }
    }),
      takeWhile(() => this.componentActive);

    this.currentItemMetadata$.subscribe(data => {
      this.allItemFields = data;
    }), takeWhile(() => this.componentActive);

    this.itemFields$.subscribe(data => {
      this.fields = data;
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

  onFormFinished(finished: any) {
    console.log('MediaItemDetailsComponent - onFormFinished outside: ', finished);
    this.dynamicForm.changes.subscribe(value => {
      console.log('MediaItemDetailsComponent - onFormFinished inside: ', value);
    });
  }

  submit(value?: any) {
    console.log('submit form: ', this.dynamicForm.value);
    console.log('submit is Form valid: ', this.dynamicForm.valid);
  }

  activateViewer() {
    this.router.navigate([`media-viewer/${this.id}`]);
  }

  doneDialogClick: EmitType<object> = () => {
    this.fieldsDialog.hide();
  }

  doneDialogButtons: Object[] = [{
    click: this.doneDialogClick.bind(this),
    buttonModel: { content: 'Done', isPrimary: true }
  }];

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
