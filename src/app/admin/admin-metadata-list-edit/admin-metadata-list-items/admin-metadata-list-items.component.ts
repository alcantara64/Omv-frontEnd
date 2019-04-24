import { Component, OnInit, ViewChild } from '@angular/core';
import { GridColumn } from 'src/app/core/models/grid.column';
import { MetadataListItem } from 'src/app/core/models/entity/metadata-list-item';
import { AdminMediaState } from '../../state/admin-media/admin-media.state';
import { MetadataList } from 'src/app/core/models/entity/metadata-list';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { GetMetaDataListsItem, CreateMetaDataListItem, GetMetaDataListsItemById } from '../../state/admin-media/admin-media.action';
import { takeWhile } from 'rxjs/operators';
import { ListComponent } from 'src/app/shared/list/list.component';
import { EmitType } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-metadata-list-items',
  templateUrl: './admin-metadata-list-items.component.html',
  styleUrls: ['./admin-metadata-list-items.component.css']
})
export class AdminMetadataListItemsComponent extends ListComponent implements OnInit {
  name: string = '';
  listId: number;
  metadataListItems: MetadataListItem[] = [];
  metadataListItemForm: FormGroup;

  metadataList = new MetadataListItem();
  columns: GridColumn[] = [
    { type: "checkbox", headerText: "Select All", width: "100", field: "" },
    { type: "", headerText: "Name", width: "", field: "itemDescription" },
    
  ];
  listItemId: number;
  componentActive = true;
  
  public editIcon = "<span class='e-icons e-pencil' style='color: #0097A9 !important'></span>";
  public removeLink = "<a class='remove-cls ' style='color: #0097A9 !important; text-decoration: underline !important;'>Remove</a>";
  
  @Select(AdminMediaState.getCurrentMetadataListId) currentListid$: Observable<MetadataList[]>;
  @Select(AdminMediaState.getCurrentMetadataListItem) metadaListItem$: Observable<MetadataListItem[]>;
  
  @ViewChild('listItemDialog') public listItemDialog: DialogComponent;
  @ViewChild('confirmDialog')
  public confirmDialog: DialogComponent;

  constructor(protected store: Store,
    protected activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,) { super(store) }

    ngOnInit() {
      this.metadataListItemForm = this.formBuilder.group({
        metadataListItemId: [''],
        metadataListId: [''],
        itemValue :[''],
        itemDescription :[''],
        itemSort :[''],
        parentItemValue :[''],
        status :[''],
      
      });
        // Get the id in the browser url and reach out for the User
    this.activatedRoute.paramMap.subscribe(params => {
      this.listId = Number(params.get('id'));
      if (this.listId) {
        console.log(this.listId, 'current metadalist')
        this.store.dispatch(new GetMetaDataListsItemById(this.listId));
        this.metadaListItem$.subscribe(metadatalistItem => this.metadataListItems = metadatalistItem);
      }
    }),
    takeWhile(() => this.componentActive);

  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  addListMembers(metadalist:MetadataListItem){
    console.log('users ============: ', metadalist);
    this.listItemDialog.show();
  }

  
addMembersClick: EmitType < object > = () => {
  //this.store.dispatch(new CreateMetaDataListItem(MetadataListItem));
  this.ShowSpinner(true);
  console.log('saveDlgBtnClick',  this.name);

  if (this.metadataListItemForm.valid) {
    if (this.metadataListItemForm.dirty) {
      const metadataListItem: MetadataListItem = { ...this.metadataListItems, ...this.metadataListItemForm.value };
      console.log('testing create metatadata - ', metadataListItem);
      this.metadataListItemForm.setValue({
        metadataListItemId: metadataListItem.metadataListItemId,
        metadataListId:this.listId,
        itemValue :[''],
        itemDescription :[''],
        itemSort :[''],
        parentItemValue :[''],
        status :[''], 
      })
      this.store.dispatch(new CreateMetaDataListItem(this.listId, metadataListItem));
      this.ShowSpinner(false);
      this.closeDialog();
      this.metadataListItemForm.reset();
    }
  }
  // this.listId = null;
  this.listItemDialog.hide();
}
cancelRemove() {
  this.confirmDialog.hide();
}

closeDialog() {
  this.listItemDialog.hide();
}
dialogButtons: Object[] = [
  { click: this.addMembersClick.bind(this), buttonModel: { content: 'Add To list', isPrimary: true } }];

}

    

