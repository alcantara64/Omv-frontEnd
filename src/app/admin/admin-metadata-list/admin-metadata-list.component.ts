import { Component, OnInit, ViewChild } from '@angular/core';
import { ListComponent } from 'src/app/shared/list/list.component';
import { Store, Select } from '@ngxs/store';
import { GridColumn } from 'src/app/core/models/grid.column';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MetadataList } from 'src/app/core/models/entity/metadata-list';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { AdminMediaState } from '../state/admin-media/admin-media.state';
import { Observable } from 'rxjs';
import { EmitType } from '@syncfusion/ej2-base';
import { CreateMetaDataList, GetMetaDataLists, RemoveMetaDataList, DisableMetadataList, EnableMetadataList } from '../state/admin-media/admin-media.action';
import { AdminMetadaListType } from 'src/app/core/enum/admin-user-type';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-metadata-list',
  templateUrl: './admin-metadata-list.component.html',
  styleUrls: ['./admin-metadata-list.component.css']
})
export class AdminMetadataListComponent extends ListComponent implements OnInit {
  columns: GridColumn[] = [

    { headerText: ' ', type: 'checkbox', width: '50', field: '' },
    { headerText: 'Name', field: 'metadataListName', width: '70' },
    { headerText: 'Status', width: '150', field: 'statusName' },];

  public editIcon = "<span class='e-icons e-pencil' style='color: #0097A9 !important'></span>";
  removeLink = "<a class='remove-cls ' style='color: #0097A9 !important; text-decoration: underline !important;'>Remove</a>";


  fieldName: string = '';
  fieldType: string = '';
  fieldId: number;
  metadataListForm: FormGroup;
  metadataList = new MetadataList();

  statusChange: string;
  urlparam: string;
  ENABLE: string = "Enable";
  DISABLE: string = "Disable";

  @ViewChild('listview') public dialogList: any;
  @ViewChild('listDialog') public listDialogList: DialogComponent;

  @Select(AdminMediaState.getMetaDataLists) metadataLists$: Observable<MetadataList[]>;
  @Select(AdminMediaState.getActiveMetadataList) activeMetadataList$: Observable<MetadataList[]>;
  @Select(AdminMediaState.getDisabledMetadataList) disableMetadataList$: Observable<MetadataList[]>;

  metadataLists: MetadataList[];

  public saveDlgBtnClick: EmitType<object> = () => {
    this.ShowSpinner(true);
    console.log('saveDlgBtnClick', this.fieldName, this.fieldType);
 
    if (this.metadataListForm.valid) {
      if (this.metadataListForm.dirty) {
        const metadataList: MetadataList = { ...this.metadataList, ...this.metadataListForm.value };
        console.log('testing create metatadata - ', metadataList);
        this.store.dispatch(new CreateMetaDataList(metadataList));
        this.ShowSpinner(false);
        this.closeDialog();
        this.metadataListForm.reset();
      }
    }
  }

  componentActive: boolean = false;


  constructor(protected store: Store,
    private activatedRoute: ActivatedRoute,
    protected router: Router,
    private formBuilder: FormBuilder, ) {
    super(store);
    this.ShowLefNav(true);
    this.componentActive = true;
  }
  addList(action) {
    console.log('action', action.itemData);
  }
  ngOnInit() {
    this.metadataListForm = this.formBuilder.group({
      id: [],
      fieldName: ['', [Validators.required]],
      status :[]
      //fieldType: ['', [Validators.required]],
    });
    this.activatedRoute.params.subscribe(params => {
      this.store.dispatch(new GetMetaDataLists());
     // this.displayList(params.type);
    });
    this.metadataLists$.subscribe(lists => {
      console.log('AdminMetadataLIstComponent ngOninit lists: ', lists);
      this.metadataLists = lists;
    });
  }
  displayList(param: string) {
    this.urlparam = param;
    switch (param) {
      case AdminMetadaListType.Active:
        this.activeMetadataList$.subscribe(activeMetadataList => (this.metadataLists = activeMetadataList));
        this.statusChange = this.DISABLE;
        break;
      case AdminMetadaListType.Disabled:
        this.disableMetadataList$.subscribe(DisableMetadataList => (this.metadataLists = DisableMetadataList));
        this.statusChange = this.ENABLE;
        break;
      default:
      this.activeMetadataList$.subscribe(activeMetadataList => (this.metadataLists = activeMetadataList));
      this.statusChange = this.DISABLE;
        break;
    }
  }

  changeMetadataListStatus(metadatlists: MetadataList[]) {
    this.ShowSpinner(true);
    const lastMetadataList = metadatlists[metadatlists.length - 1];
    metadatlists.forEach(metadatlist => {
      let shouldRefreshList = lastMetadataList.id === metadatlist.id; // Get fresh list of metadatlists only when updating final metadatlist
      if (this.statusChange === this.ENABLE) {
        this.store.dispatch(new EnableMetadataList(metadatlist.id, metadatlist, shouldRefreshList));
      } else {
        this.store.dispatch(new DisableMetadataList(metadatlist.id, metadatlist, shouldRefreshList));
      }
    });
  }

  edit(data?: MetadataList) {
    if (!data) {
      this.router.navigate([`admin/media/metadata/0/edit`]);
    } else {
      this.router.navigate([`admin/media/metadata/${data.id}/edit`]);
    }
  }
  add() {
    this.listDialogList.show();
  }
  closeDialog() {
    this.listDialogList.hide();
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

