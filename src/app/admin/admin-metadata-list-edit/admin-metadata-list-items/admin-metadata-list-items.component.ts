import { Component, OnInit, ViewChild } from '@angular/core';
import { GridColumn } from 'src/app/core/models/grid.column';
import { MetadataListItem } from 'src/app/core/models/entity/metadata-list-item';
import { AdminMediaState } from '../../state/admin-media/admin-media.state';
import { MetadataList } from 'src/app/core/models/entity/metadata-list';
import { Observable, Subject } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { GetMetaDataListsItem, CreateMetaDataListItem, GetMetaDataListsItemById, RemoveMetaDataListItem } from '../../state/admin-media/admin-media.action';
import { takeWhile } from 'rxjs/operators';
import { ListComponent } from 'src/app/shared/list/list.component';
import { EmitType, remove } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShowSpinner } from 'src/app/state/app.actions';

@Component({
  selector: 'app-admin-metadata-list-items',
  templateUrl: './admin-metadata-list-items.component.html',
  styleUrls: ['./admin-metadata-list-items.component.css']
})
export class AdminMetadataListItemsComponent extends ListComponent implements OnInit {
  private unsubscribe: Subject<void> = new Subject();
  name: string = '';
  listId: number;
  metadataListItems: MetadataListItem[] = [];
  metadataListItemForm: FormGroup;

  metadataList = new MetadataListItem();
  columns: GridColumn[] = [
    { type: "", headerText: "Name", width: "80", field: "itemDescription" },

  ];
  listItemId: number;
  componentActive = true;

  public editIcon = "<span class='e-icons e-pencil' style='color: #0097A9 !important'></span>";
  public removeLink = "<a class='remove-cls ' style='color: #0097A9 !important; text-decoration: underline !important; width:10px;'>Remove</a>";

  @Select(AdminMediaState.getCurrentMetadataListId) currentListid$: Observable<MetadataList[]>;
  @Select(AdminMediaState.getCurrentMetadataListItem) metadaListItem$: Observable<MetadataListItem[]>;

  @ViewChild('listItemDialog') public listItemDialog: DialogComponent;
  @ViewChild('confirmDialog')
  public confirmDialog: DialogComponent;
  selectedMetadataListItemId: any;

  constructor(protected store: Store,
    protected activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, ) { super(store) }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.listId = Number(params.get('id'));
      if (this.listId) {
        console.log(this.listId, 'current metadalist')
        this.store.dispatch(new GetMetaDataListsItemById(this.listId));
        this.metadaListItem$.subscribe(metadatalistItem => this.metadataListItems = metadatalistItem);
      }
      this.metadataListItemForm = this.formBuilder.group({
        metadataListItemId: null,
        metadataListId: this.listId,
        itemValue: [''],
        itemDescription: [''],
        itemSort: [''],
        parentItemValue: [''],
        status: null,
        statusName: ['']
      });
    })

      // Get the id in the browser url and reach out for the User
      ,
      takeWhile(() => this.componentActive);

  }

  ngOnDestroy(): void {
    this.componentActive = false;
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  addListMembers(metadalist: MetadataListItem) {
    console.log('users ============: ', metadalist);
    this.listItemDialog.show();
  }

  clearForm() {
    this.metadataListItemForm.reset({
      metadataListItemId: null,
      metadataListId: this.listId,
      itemValue: '',
      itemDescription: '',
      itemSort: '',
      parentItemValue: '',
      status: '',
      statusName: ''
    });
  }

  addMembersClick: EmitType<object> = () => {
    // this.store.dispatch(new CreateMetaDataListItem(this.listId, MetadataListItem));
    this.ShowSpinner(true);
    console.log('saveDlgBtnClick', this.name);

    if (this.metadataListItemForm.valid) {
      if (this.metadataListItemForm.dirty) {
        const metadataListItem: MetadataListItem = { ...this.metadataListItems, ...this.metadataListItemForm.value };
        // this.metadataListItemForm.value
        console.log('testing create metatadata - ', metadataListItem);
        this.metadataListItemForm.patchValue({
          metadataListItemId: null,
          metadataListId: this.listId,
          itemValue: '',
          itemDescription: '',
          itemSort: '',
          parentItemValue: '',
          status: '',
          statusName: ''
        });
        console.log('metatadata', this.metadataListItemForm)
        this.store.dispatch(new ShowSpinner());
        this.store.dispatch(new CreateMetaDataListItem(this.listId, metadataListItem));
        // this.ShowSpinner(false);
        this.closeDialog();
        this.clearForm();
      }
    }
    // this.listId = null;
    this.listItemDialog.hide();
  }

  public closeBtnDlgClick: EmitType<object> = () => {
    this.confirmDialog.hide();
  }
  show(data) {
    console.log('event', data);
    this.selectedMetadataListItemId = data.metadataListItemId;
    this.confirmDialog.show();
  }
  public RemoveDlgBtnClick: EmitType<object> = () => {
    this.store.dispatch(new ShowSpinner());
    this.store.dispatch(new RemoveMetaDataListItem(this.listId, this.selectedMetadataListItemId));
    this.metadaListItem$.subscribe(items => {
      this.metadataListItems = items;
    });
    this.confirmDialog.hide();
  }
  confirmDlgButtons = [{ click: this.RemoveDlgBtnClick.bind(this), buttonModel: { content: 'Yes', isPrimary: true } },
  { click: this.closeBtnDlgClick.bind(this), buttonModel: { content: 'No' } }];

  cancelRemove() {
    this.confirmDialog.hide();
  }
  remove(data) {
    // console.log(data);    
    this.store.dispatch(new ShowSpinner());
    this.store.dispatch(new RemoveMetaDataListItem(this.listId, data.metadataListItemId));
  }
  closeDialog() {
    this.listItemDialog.hide();
  }
  dialogButtons: Object[] = [
    { click: this.addMembersClick.bind(this), buttonModel: { content: 'Add To list', isPrimary: true } }];

}



