import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, AfterContentChecked, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Select, Store } from '@ngxs/store';
import { GetMediaItemDetails, AddMediaItemField, RemoveMediaItemField, UpdateMediaItem } from '../../state/media/media.action';
import { MediaState } from '../../state/media/media.state';
import { Observable } from 'rxjs';
import { DynamicFormComponent } from 'src/app/shared/dynamic-components/components/dynamic-form.component';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { takeWhile } from 'rxjs/operators';
import { EmitType } from '@syncfusion/ej2-base';
import { FieldConfiguration } from 'src/app/shared/dynamic-components/field-setting';
import { MediaItem } from 'src/app/core/models/entity/media';

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
  @Select(MediaState.getCurrentMediaItem) mediaItem$: Observable<MediaItem>;
  @Select(MediaState.getItemFields) itemMetadataFields$: Observable<any[]>;
  @Select(MediaState.getCurrentItemMetadata) metadataFields$: Observable<any[]>;

  @ViewChild('fieldsDialog') fieldsDialog: DialogComponent;
  @ViewChild('listview') element: any;

  
  initialFields: FieldConfiguration[] = [{
    type: 'label',
    name: '',
    label: '',
    value: ''
  }]
  itemMetadataFields: FieldConfiguration[] = [];
  mediaItem: MediaItem;
  mediaItemId: any;
  itemFields: Object = { text: 'label', value: 'name' };
  metadataFields: any[];
  itemDetails: any;
  selectedFields: FieldConfiguration[] = [];
  isFormValid: boolean;
  

  constructor(private store: Store, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.mediaItemId$.subscribe(id => {
      if (id) {
        this.mediaItemId = id;
        this.store.dispatch(new GetMediaItemDetails(id));
      }
    }),
    takeWhile(() => this.componentActive);

    this.mediaItem$.subscribe(item => {
      this.mediaItem = item;
    }), takeWhile(() => this.componentActive);

    this.metadataFields$.subscribe(fields => {      
      this.metadataFields = fields;
    }), takeWhile(() => this.componentActive);

    this.itemMetadataFields$.subscribe(fields => {
      this.itemMetadataFields = fields;
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
    // this.dynamicForm.changes.subscribe(value => {
    //   console.log('MediaItemDetailsComponent - onFormFinished inside: ', value);
    // });
  }

  discardChanges() {
    this.store.dispatch(new GetMediaItemDetails(this.mediaItemId));
  }

  submit(value?: any) {
    console.log('submit form: ', this.dynamicForm.value);
    const { id }  = this.mediaItem;
    this.mediaItem.metadata = JSON.stringify(this.dynamicForm.value);
    this.store.dispatch(new UpdateMediaItem(id, this.mediaItem));
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
    this.metadataFields.map(field => field.isSelected = false);
    this.selectedFields = [];
  }

  addFields() {
    this.selectedFields.forEach(field => {
      if (this.dynamicForm) {
        this.dynamicForm.addControl(field);
      }
      this.store.dispatch(new AddMediaItemField(field));
    });
    this.closeDialog();
  }

  selectField(item) {
    if (item.isChecked) return;
    this.metadataFields.map(x => {
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
