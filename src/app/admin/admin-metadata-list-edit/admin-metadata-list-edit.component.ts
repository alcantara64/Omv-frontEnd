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
import { CreateMetaDataList, UpdateMetadataList, GetMetaDataList, GetMetaDataListsItem, GetMetaDataListItem } from '../state/admin-media/admin-media.action';
import { takeWhile } from 'rxjs/operators';
import { Metadata } from 'src/app/core/models/entity/metadata';
import { MetadataListStatus } from 'src/app/core/enum/metadata-list-status';

const METADATALIST_TAB =0;
const UPDATE_METADATALIST_ITEMS = 'Update list';
const CREATE_METADATALIST_ITEMS = 'Create list';

@Component({
  selector: 'app-admin-metadata-list-edit',
  templateUrl: './admin-metadata-list-edit.component.html',
  styleUrls: ['./admin-metadata-list-edit.component.css', './../../app.component.css']
})

export class AdminMetadataListEditComponent extends EditComponent implements OnInit {

  componentActive = true;
  metadataListForm: FormGroup;
  metadata = new MetadataList();
  metadataId: number;

   metadataItemTabs: Tab[] = [
    { link: METADATALIST_TAB, name: 'List Items', isActive: true} ];

    @Select(AdminMediaState.getCurrentMetadataList) currentMetadataList$: Observable<MetadataList>;
    @Select(AdminMediaState.getCurrentMetadataListId) currentMetadataListId$: Observable<number>;
    
    metaDataActionText: string;
    createMetaDataButtonText: string;
    errorMessage: string;

  constructor (protected store: Store,
    protected router: Router,
     private fb: FormBuilder,
     private activatedRoute: ActivatedRoute)
      {super(store, router);
        this.ShowLefNav(false);
      }
      public data: { [key: string]: Object }[] = [{ id: 1, name: 'active' },
      { id: 0, name: 'inactive' }];
      public listFields: Object = { text: 'name', value: 'id' };
      public placeholder: string = 'Change status';
ngOnInit() {
  this.metadataListForm = this.fb.group({
    id: '',
    name: [ '', [ Validators.required ] ],
    status: ''
  });

  // Get the id in the browser url and reach out for the metada list
  this.activatedRoute.paramMap.subscribe(params => {
    this.metadataId = Number(params.get('id'));
    if (this.metadataId) {
      this.store.dispatch(new GetMetaDataList(this.metadataId));
      this.createMetaDataButtonText = UPDATE_METADATALIST_ITEMS;
      console.log(this.metadataId, 'action is dispached')
    }
  }),
  takeWhile(() => this.componentActive);

    // Get the current list
    this.currentMetadataList$.subscribe(list => {
      console.log('list the final list; ', list)
    
      if (list) { // 
        this.metaDataActionText = list.status == MetadataListStatus.Active ? UPDATE_METADATALIST_ITEMS: CREATE_METADATALIST_ITEMS;
        this.metadataListForm.patchValue({
        
          status :['active','inactive'],
          name: list.fieldName,
        });
        this.listFields = list;
        
       }   else {
        this.metadataListForm.reset();
      
       }
    }),
    takeWhile(() => this.componentActive);
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
 
  async save() {
    if (this.metadataListForm.valid) {
      if (this.metadataListForm.dirty) {
        const MetadataList: MetadataList = { ...this.metadata, ...this.metadataListForm.value };

        if (this.metadataId === 0) {
          console.log('AdminMetadataListEditComponent - save: ', MetadataList);
          await this.store.dispatch(new CreateMetaDataList(MetadataList));
          this.currentMetadataListId$.subscribe(metadataId => {
            if (metadataId) {
              this.metadataListForm.reset();
              this.router.navigate([`/admin/media/${metadataId}/edit`]);
              this.setNotification('List Item Created');
            }
          }),
          takeWhile(() => this.componentActive);
        } else {
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
  


