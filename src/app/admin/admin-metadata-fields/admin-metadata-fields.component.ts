import { Component, OnInit, ViewChild } from '@angular/core';
import { ListComponent } from 'src/app/shared/list/list.component';
import { Store, Select } from '@ngxs/store';
import { GridColumn } from 'src/app/core/models/grid.column';
import { AdminMediaState } from '../state/admin-media/admin-media.state';
import { Observable } from 'rxjs';
import { MetadataFields } from 'src/app/core/models/entity/metadata-fields';
import { GetMetaDataFields, RemoveMetaDataFields } from '../state/admin-media/admin-media.action';
import { EmitType } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-admin-metadata-fields',
  templateUrl: './admin-metadata-fields.component.html',
  styleUrls: ['./admin-metadata-fields.component.css']
})
export class AdminMetadataFieldsComponent extends ListComponent implements OnInit {
  columns: GridColumn[] = [
    { headerText: 'Name', field: 'fieldName', width: '70' },
    { headerText: 'Type', field: 'fieldType', width: '80' },
    { headerText: 'List', width: '150', field: 'List' },
    { headerText: ' ', type: 'checkbox', width: '50', field: 'isUnique' }
    // { headerText: 'Actions', width: '50', field: '', template: "<span class='e-icons e-pencil' style='color: #0097A9 !important'></span>"}
  ];
  editLink = "<a class='remove-cls ' style='color: #0097A9 !important; text-decoration: underline !important;'>Remove</a>";
  removeLink = "<span class='e-icons e-pencil' style='color: #0097A9 !important'></span>";
  @Select(AdminMediaState.getMetaDataFields) metadataFields$: Observable<MetadataFields[]>;
  metadataFields: MetadataFields[];
  @ViewChild('fieldDialog')
  public fieldDialogList: DialogComponent;

  public saveDlgBtnClick: EmitType<object> = () => {
    this.ShowSpinner(true);
    // var permissionData = this.fieldDialogList.getSelectedItems().data;
    // let permissionidArray: any[] = [];

    // permissionData.forEach(permission => {
    //   permissionidArray.push(permission.id);
    // });

    // this.selectedGroups.forEach(user => {
    //   this.store.dispatch(new AssignToPermission(user.id, permissionidArray));
    // });


    // this.permissionDialog.hide();
    // this.store.dispatch(new GetPermissions());
  }


  constructor(protected store: Store) {
    super(store);
    this.ShowLefNav(true);
  }

  ngOnInit() {
    this.store.dispatch(new GetMetaDataFields());
    this.metadataFields$.subscribe(fields => {
      this.metadataFields = fields;
    });
  }
  navigate(action) {
    console.log('action', action);
  }
  add() {
    this.fieldDialogList.show();
  }

  remove(data){
    console.log(data);
    this.store.dispatch(new RemoveMetaDataFields(data.id));
  }
  addDlgButtons: Object[] = [{ click: this.saveDlgBtnClick.bind(this), buttonModel: { content: 'Save', isPrimary: true } }];


}
