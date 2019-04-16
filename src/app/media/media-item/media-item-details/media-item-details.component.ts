import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, AfterContentChecked, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Select, Store } from '@ngxs/store';
import { GetMediaItemDetails, AddMediaItemField, RemoveMediaItemField, UpdateMediaItem, ClearMediaItemMetadata } from '../../state/media/media.action';
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
export class MediaItemDetailsComponent implements OnInit, OnDestroy {
  public isPDF = true;

  public service: string = 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer';
  public document: string = 'PDF_Succinctly.pdf';
  public minDate: Date = new Date("05/07/2017");
  public maxDate: Date = new Date("05/27/2017");
  public value: Date = new Date("05/16/2017");
  id: any;
  @Select(MediaState.getMediaItemId) mediaId$: Observable<number>;

  componentActive = true;
  @ViewChild(DynamicFormComponent) dynamicForm: DynamicFormComponent;
  @ViewChild('fieldsDialog') fieldsDialog: DialogComponent;
  @ViewChild('listview') element: any;

  @Select(MediaState.getMediaItemId) mediaItemId$: Observable<number>;
  @Select(MediaState.getCurrentMediaItem) mediaItem$: Observable<MediaItem>;
  @Select(MediaState.getItemFields) itemMetadataFields$: Observable<any[]>;
  @Select(MediaState.getCurrentItemMetadata) metadataFields$: Observable<any[]>;

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
        this.id = id;
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

    this.itemMetadataFields$.subscribe(fields => {
        this.itemMetadataFields = fields;
    }), takeWhile(() => this.componentActive);
  }

  ngOnDestroy(): void {
    this.dynamicForm = null;
    this.store.dispatch(new ClearMediaItemMetadata());
    this.componentActive = false;
  }

  onFormFinished(finished: any) {
    console.log('MediaItemDetailsComponent - onFormFinished outside: ', finished);
  }

  discardChanges() {
    this.store.dispatch(new ClearMediaItemMetadata());
    this.store.dispatch(new GetMediaItemDetails(this.mediaItemId));
  }

  submit(value?: any) {
    let metadata = this.dynamicForm ? JSON.stringify(this.dynamicForm.value) : '{}';
    console.log('submit form: ', metadata);
    const { id }  = this.mediaItem;
    this.mediaItem.metadata = metadata;
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
