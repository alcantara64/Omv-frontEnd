import { Component, OnInit, ViewChild } from '@angular/core';
import { ListComponent } from 'src/app/shared/list/list.component';
import { Store, Select } from '@ngxs/store';
import { GridColumn } from 'src/app/core/models/grid.column';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MetadataLists } from 'src/app/core/models/entity/metadata-list';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { AdminMediaState } from '../state/admin-media/admin-media.state';
import { Observable } from 'rxjs';
import { EmitType } from '@syncfusion/ej2-base';
import { CreateMetaDataList, GetMetaDataLists, RemoveMetaDataList } from '../state/admin-media/admin-media.action';

@Component({
  selector: 'app-admin-metadata-list',
  templateUrl: './admin-metadata-list.component.html',
  styleUrls: ['./admin-metadata-list.component.css']
})
export class AdminMetadataListComponent extends ListComponent implements OnInit {
  columns: GridColumn[] = [
    { headerText: 'Name', field: 'fieldName', width: '70' },
    { headerText: 'Type', field: 'fieldType', width: '80' },
    { headerText: 'List', width: '150', field: 'List' },];
  public data: { [key: string]: Object }[] = [{ id: 1, name: 'All Platforms' },
  { id: 2, name: 'All Register Types' }, { id: 3, name: 'All Systems' }];
  public listFields: Object = { text: 'name', value: 'id' };
  public placeholder: string = 'Select a List';
  editLink = "<a class='remove-cls ' style='color: #0097A9 !important; text-decoration: underline !important;'>Remove</a>";
  removeLink = "<span class='e-icons e-pencil' style='color: #0097A9 !important'></span>";
  fieldName: string = '';
  fieldType: string  = '';
  fieldId: number;
  metadataListForm: FormGroup;
  metadataList = new MetadataLists();

  @ViewChild('listview') public dialogList: any;
  @ViewChild('listDialog') public listDialogList: DialogComponent;
  @Select(AdminMediaState.getMetaDataLists) metadataLists$: Observable<MetadataLists[]>;

  metadataLists: MetadataLists[];

  public saveDlgBtnClick: EmitType<object> = () => {
    this.ShowSpinner(true);
    console.log('saveDlgBtnClick', this.fieldName, this.fieldType);

    if (this.metadataListForm.valid) {
      if (this.metadataListForm.dirty) {
        const metadataList: MetadataLists = { ...this.metadataList, ...this.metadataListForm.value };
        console.log('testing create user - ', metadataList);
        this.store.dispatch(new CreateMetaDataList(metadataList));
      }
    }
  }

  componentActive: boolean =false;


  constructor(protected store: Store,
    private formBuilder: FormBuilder,) {
    super(store);
    this.ShowLefNav(true);
    this.componentActive = true;
  }
  addList(action){
    console.log('action', action.itemData);
  }
  ngOnInit() {
    this.metadataListForm = this.formBuilder.group({
      id: [''],
      fieldName: [ '', [ Validators.required ] ],
      fieldType: [ '', [ Validators.required ] ],
    });
    this.store.dispatch(new GetMetaDataLists());
    this.metadataLists$.subscribe(lists => {
      this.metadataLists = lists;
    });
  }
  navigate(action) {
    console.log('action', action);
  }
  add() {
    this.listDialogList.show();
  }

  remove(data) {
    console.log(data);
    this.store.dispatch(new RemoveMetaDataList(data.id));
    this.metadataLists$.subscribe(lists => {
      this.metadataLists = lists;
    });
  }
  addDlgButtons: Object[] = [{ click: this.saveDlgBtnClick.bind(this), buttonModel: { content: 'Save', isPrimary: true } }];


}

