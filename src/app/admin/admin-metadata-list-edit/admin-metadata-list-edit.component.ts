import { Component, OnInit, ViewChild } from '@angular/core';
import { EditComponent } from 'src/app/shared/edit/edit.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Tab } from 'src/app/core/models/tab';
import { AdminMediaState } from '../state/admin-media/admin-media.state';
import { MetadataList } from 'src/app/core/models/entity/metadata-list';
import { Observable } from 'rxjs';
import { messageType, ShowSpinner } from 'src/app/state/app.actions';
import { CreateMetaDataList, UpdateMetadataList, GetMetaDataList, GetMetaDataListsItem, GetMetaDataListsItemById, GetMetaDataDetailById, CreateMetaDataListItem, UpdateMetadataListItem, DisableMetadataList, EnableMetadataList } from '../state/admin-media/admin-media.action';
import { takeWhile } from 'rxjs/operators';
import { Metadata } from 'src/app/core/models/entity/metadata';
import { MetadataListStatus } from 'src/app/core/enum/metadata-list-status';
import { MetadataDetail } from 'src/app/core/models/entity/metadata-detail';
import { MetadataListItem } from 'src/app/core/models/entity/metadata-list-item';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';

const METADATALIST_TAB = 0;
const UPDATE_METADATALIST_ITEMS = 'Update list';
const DISABLE_METADATALIST_ITEMS = 'Disable list';
const ENABLE_METADATALIST_ITEMS = 'Enable list';

@Component({
  selector: 'app-admin-metadata-list-edit',
  templateUrl: './admin-metadata-list-edit.component.html',
  styleUrls: ['./admin-metadata-list-edit.component.css', './../../app.component.css']
})

export class AdminMetadataListEditComponent extends EditComponent implements OnInit {

  componentActive = true;
  metadataListForm: FormGroup;
  metadata = new MetadataDetail();
  metadataId: number;


  metadataItemTabs: Tab[] = [
    { link: METADATALIST_TAB, name: 'List Items', isActive: true }];

  @Select(AdminMediaState.getCurrentMetadataList) currentMetadataList$: Observable<MetadataList>;
  @Select(AdminMediaState.getCurrentMetadataDetail) currentMetadataDetail$: Observable<MetadataDetail>;
  @Select(AdminMediaState.getCurrentMetadataListId) currentMetadataListId$: Observable<number>;

  metaDataActionText: string;
  createMetaDataButtonText: string;
  errorMessage: string;
  metadatalist: any;
  @ViewChild('confirmDialog')
  public confirmDialog: DialogComponent;

  metadataStatus = MetadataListStatus;
  constructor(protected store: Store, protected router: Router, private fb: FormBuilder, private activatedRoute: ActivatedRoute) {
    super(store, router)
    this.ShowLefNav(false);
    this.metadataListForm = this.fb.group({
      metadataListId: '',
      metadataListName: ['', [Validators.required]],
      status: ''
    });

  }
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.metadataId = Number(params.get('id'));
      this.store.dispatch(new GetMetaDataDetailById(this.metadataId));
      this.createMetaDataButtonText = UPDATE_METADATALIST_ITEMS;
      // this.metaDataActionText = DISABLE_METADATALIST_ITEMS
      this.currentMetadataDetail$.subscribe(metadataList => {

        if (metadataList) { // Existing 
          this.metadataListForm.setValue({
            metadataListId: metadataList.metadataListId,
            metadataListName: metadataList.metadataListName,
            status: metadataList.status,
          });
          this.metaDataActionText = metadataList.status == MetadataListStatus.Active ? DISABLE_METADATALIST_ITEMS : ENABLE_METADATALIST_ITEMS;
          this.metadataListForm.patchValue({
            id: metadataList.metadataListId,
            metadataListName: metadataList.metadataListName,
            status: metadataList.status
          });
          this.metadata = metadataList;

          this.metadatalist = { ...this.metadata, ...this.metadataListForm.value };
        }
        // this.store.dispatch(new GetMetaDataList(this.metadataId));
        // this.currentMetadataList$.subscribe(list=>{
        //   this.metadatalist = list;
        // }) ;
      }),
        takeWhile(() => this.componentActive);
    }
    );
  }
  ngOnDestroy() {
    this.componentActive = false;
  }

  async save() {
    if (this.metadataListForm.valid) {
      if (this.metadataListForm.dirty) {
        const MetadataList: MetadataList = { ...this.metadata, ...this.metadataListForm.value };
        this.metadatalist = MetadataList;
        if (this.metadataId) {
          console.log('AdminMetadataListEditComponent - save: ', MetadataList);
          this.metadataListForm.setValue({
            metadataListId: this.metadataId,
            metadataListName: MetadataList.metadataListName,
            status: MetadataList.status
          });
          this.store.dispatch(new ShowSpinner());
          this.store.dispatch(new UpdateMetadataList(this.metadataId, MetadataList));
          takeWhile(() => this.componentActive);
        }
      }
    } else {
      this.errorMessage = "Please correct the validation errors.";
    }
  }
  changeStatus() {
    this.store.dispatch(new ShowSpinner());
    if (this.metaDataActionText === DISABLE_METADATALIST_ITEMS) {
      this.store.dispatch(new DisableMetadataList(this.metadataId, this.metadatalist, true));
      this.metaDataActionText = ENABLE_METADATALIST_ITEMS;
    }
    else {
      this.store.dispatch(new EnableMetadataList(this.metadataId, this.metadatalist, true));
      this.metaDataActionText = DISABLE_METADATALIST_ITEMS;
    }
  }
  public closeBtnDlgClick: EmitType<object> = () => {
    this.confirmDialog.hide();
  }
  show(data) {
    console.log('event', data);
    // this.selectedMetadataFieldId = data.metadataFieldId;
    this.confirmDialog.show();
  }
  public RemoveDlgBtnClick: EmitType<object> = () => {
this.changeStatus()
    this.confirmDialog.hide();
  }
  confirmDlgButtons = [{ click: this.RemoveDlgBtnClick.bind(this), buttonModel: { content: 'Yes', isPrimary: true } },
  { click: this.closeBtnDlgClick.bind(this), buttonModel: { content: 'No' } }];

  cancelRemove() {
    this.confirmDialog.hide();
  }
}



