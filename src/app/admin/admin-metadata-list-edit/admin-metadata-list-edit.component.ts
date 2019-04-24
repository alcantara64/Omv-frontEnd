import { Component, OnInit } from '@angular/core';
import { EditComponent } from 'src/app/shared/edit/edit.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Tab } from 'src/app/core/models/tab';
import { AdminMediaState } from '../state/admin-media/admin-media.state';
import { MetadataList } from 'src/app/core/models/entity/metadata-list';
import { Observable } from 'rxjs';
import { messageType } from 'src/app/state/app.actions';
import { CreateMetaDataList, UpdateMetadataList, GetMetaDataList, GetMetaDataListsItem, GetMetaDataListsItemById, GetMetaDataDetailById, CreateMetaDataListItem } from '../state/admin-media/admin-media.action';
import { takeWhile } from 'rxjs/operators';
import { Metadata } from 'src/app/core/models/entity/metadata';
import { MetadataListStatus } from 'src/app/core/enum/metadata-list-status';
import { MetadataDetail } from 'src/app/core/models/entity/metadata-detail';
import { MetadataListItem } from 'src/app/core/models/entity/metadata-list-item';

const METADATALIST_TAB = 0;
const UPDATE_METADATALIST_ITEMS = 'Update list';
const CREATE_METADATALIST_ITEMS = 'Create list';
const DISABLE_METADATALIST_ITEMS = 'Disable list';

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

  constructor(protected store: Store, protected router: Router, private fb: FormBuilder, private activatedRoute: ActivatedRoute) {
    super(store, router)
    this.ShowLefNav(false);
    this.metadataListForm = this.fb.group({
      id: '',
      name: ['', [Validators.required]],
      status: '',
      statusName: ''
    });

  }
  public placeholder: string = 'Change status';
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.metadataId = Number(params.get('id'));
      this.store.dispatch(new GetMetaDataDetailById(this.metadataId));
      this.createMetaDataButtonText = UPDATE_METADATALIST_ITEMS;
      this.metaDataActionText = DISABLE_METADATALIST_ITEMS
      this.currentMetadataDetail$.subscribe(metadataList => {

        if (metadataList) { // Existing 
          this.metadataListForm.setValue({
            id: metadataList.metadataListId,
            name: metadataList.metadataListName,
            status: metadataList.status,
            statusName: metadataList.statusName
          });
          // this.metaDataActionText = metadataList.status == MetadataListStatus.Active ? UPDATE_METADATALIST_ITEMS : CREATE_METADATALIST_ITEMS;
          this.metadataListForm.patchValue({
            id: metadataList.metadataListId,
            name: metadataList.metadataListName,
            status: metadataList.status,
            statusName: metadataList.statusName
          });
          this.metadata = metadataList;
          console.log('AdminListEditComponent - ngOnInit: groupForm ', this.metadataListForm.value);
        } else {
        }
      }),
        takeWhile(() => this.componentActive);

      // Get the current list
      // this.currentMetadataList$.subscribe(list => {
      //   console.log('list the final list; ', list)

      //   if (list) { // 
      //     this.metaDataActionText = list.status == MetadataListStatus.Active ? UPDATE_METADATALIST_ITEMS : CREATE_METADATALIST_ITEMS;
      //     this.metadataListForm.patchValue({
      //       id: list..metadataListId,
      //       name: metadataList.metadataListName,
      //       status: metadataList.status,
      //       statusName: metadataList.statusName
      //     });
      //     this.listFields = list;

      //   } else {
      //     this.metadataListForm.reset();

      //   }
      // }),
      takeWhile(() => this.componentActive);
    }
    )
  }
  ngOnDestroy() {
    this.componentActive = false;
  }

  async save() {
    if (this.metadataListForm.valid) {
      if (this.metadataListForm.dirty) {
        const MetadataList: MetadataListItem = { ...this.metadata, ...this.metadataListForm.value };

        if (this.metadataId) {
          console.log('AdminMetadataListEditComponent - save: ', MetadataList);
          this.metadataListForm.setValue({
            id: this.metadataId,
            name: MetadataList.fieldName,
            status: MetadataList.status,
            statusName: MetadataList.statusName
          });
          await this.store.dispatch(new CreateMetaDataListItem(this.metadataId,MetadataList));
          takeWhile(() => this.componentActive);
        } else {
          // this.metadataListForm.patchValue({
          //   id: MetadataList.id,
          //   name: MetadataList.fieldName,
          //   status: MetadataList.status,
          //   statusName: MetadataList.statusName
          // });
          await this.store.dispatch(new UpdateMetadataList(MetadataList.id, MetadataList));
          this.metadataListForm.reset(this.metadataListForm.value);
          this.setNotification('List  Updated');
        }
      }
    } else {
      this.errorMessage = "Please correct the validation errors.";
      this.setNotification('Please correct the validation errors', messageType.error);
    }
  }




}



