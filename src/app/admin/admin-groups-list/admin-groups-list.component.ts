import { GetGroups, EnableGroup, DisableGroup, SetCurrentGroupId, AssignToPermission } from './state/admin.groups.action';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GridColumn } from "../../core/models/grid.column";
import {ListComponent} from "../../shared/list/list.component";
import { Router, ActivatedRoute } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { AdminGroupState } from './state/admin-groups.state';
import { Observable } from 'rxjs';
import { Group } from 'src/app/core/models/group';
import { ShowLeftNav } from 'src/app/state/app.actions';
import { AdminGroupType } from 'src/app/core/enum/admin-user-type';
import { permission, Permission } from 'src/app/core/enum/permission';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { GetPermission } from '../admin-permissions/state/admin-permissions.action';
import { AdminPermissionState } from '../admin-permissions/state/admin-permissions.state';

@Component({
  selector: 'app-admin-groups-list',
  templateUrl: './admin-groups-list.component.html',
  styleUrls: ['./admin-groups-list.component.css']
})
export class AdminGroupsListComponent extends ListComponent implements OnInit {

  selectedGroups: Group[];
  groups: Group[];
  columns: GridColumn[] = [
    { type: "checkbox", headerText: "Select All", width: "50", field: "" },
    { type: "", headerText: "Name", width: "100", field: "name" },
    { type: "", headerText: "Last Modified", width: "100", field: "modifiedBy" },
    { type: "", headerText: "Members", width: "50", field: "members" }
  ];
  public permissionFields: Object = { text: "name", value: "id" };
  ENABLE: string = "Enable";
  DISABLE: string = "Disable";

  public groupFields: Object = { text: "name", value: "id" };
  @Select(AdminGroupState.getGroups) groups$: Observable<Group[]>;
  @Select(AdminGroupState.getActiveGroups) activeGroups$: Observable<Group[]>;
  @Select(AdminGroupState.getDisabledGroups) disabledGroups$: Observable<Group[]>;

  @Select(AdminPermissionState.getPermissions) permissions$: Observable<Permission[]>;
  urlparam: string;
  statusChange: string;
  @ViewChild('groupDialog') public permissionDialog: DialogComponent;

  @ViewChild('listviewgroup')
  public groupDialogList: any;

  public target: string = '.control-section';
  permissions: Permission[];
   
  public saveDlgBtnClick: EmitType<object> = () => {
    var permissionData = this.groupDialogList.getSelectedItems().data;
    let permissionidArray:any[] = [];

    permissionData.forEach(permission => {
      permissionidArray.push(permission.id);
    });

    this.selectedGroups.forEach(user =>{
      this.store.dispatch(new AssignToPermission(user.id, permissionidArray));
   });


    this.permissionDialog.hide();
    this.store.dispatch(new GetPermission());
  } 
  
  public saveDlgButtons: Object[] = [{ click: this.saveDlgBtnClick.bind(this), buttonModel: { content: 'Save', isPrimary: true }}];

  constructor(protected store: Store, private activatedRoute: ActivatedRoute, private router:Router ){
    super(store);

    // this.store.dispatch(new ShowLeftNav(true));
    this.ShowLefNav(true);
    this.Permission = permission.VIEW_GROUP;
    this.PageTitle('Admin Groups');
  }

  ngOnInit() {

    this.store.dispatch(new GetPermission());

    this.activatedRoute.params.subscribe(params => {
      this.store.dispatch(new GetGroups());
      this.displayGroups(params.type);
    });

    // this.groups$.subscribe(groups => (this.groups = groups));  
    this.permissions$.subscribe(permissions => (this.permissions = permissions));  
  }


  displayGroups(param: string) {
    this.urlparam = param;
    switch (param) {
      case AdminGroupType.Active:
        this.activeGroups$.subscribe(activeGroups => (this.groups = activeGroups));
        this.statusChange = this.DISABLE;
        break;
      case AdminGroupType.Disabled:
        this.disabledGroups$.subscribe(
          disabledGroups => (this.groups = disabledGroups)
        );
        this.statusChange = this.ENABLE;
        break;
      default:
        break;
    }
  }

  changeGroupStatus(groups: Group[]){
    groups.forEach(group => {
      if ((this.statusChange = this.ENABLE)) {
        this.store.dispatch(new EnableGroup(group.id, group));
      } else {
        this.store.dispatch(new DisableGroup(group.id, group));
      }
    });
  }
  assignGroupsToPermissions(groups: Group[]){
    this.permissionDialog.show();
    this.selectedGroups = groups;
  }

  edit(id: number) {
    this.store.dispatch(new SetCurrentGroupId(id));
    this.router.navigate([`/admin/groups/${id}/edit`]);
  }

}
