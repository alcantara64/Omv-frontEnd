import { GetGroups, EnableGroup, DisableGroup, SetCurrentGroupId, AssignToPermission } from '../state/admin-groups/admin.groups.action';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GridColumn } from "../../core/models/grid.column";
import { ListComponent } from "../../shared/list/list.component";
import { Router, ActivatedRoute } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { AdminGroupState } from '../state/admin-groups/admin-groups.state';
import { Observable } from 'rxjs';
import { Group } from 'src/app/core/models/entity/group';
import { ShowLeftNav } from 'src/app/state/app.actions';
import { AdminGroupType } from 'src/app/core/enum/admin-user-type';
import { permission, Permission } from 'src/app/core/enum/permission';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { AdminPermissionState } from '../state/admin-permissions/admin-permissions.state';
import { GetPermissions } from '../state/admin-permissions/admin-permissions.action';

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
    { headerText: "Name", field: "nameWithBadge", width: '180' },
    { headerText: "Description", width: '170', field: "description" },
    { headerText: "Last Modified", field: "modifiedOnString" },
    { headerText: "Modified By", field: "modifiedBy" },
    { headerText: "Members", field: "memberCount", textAlign: 'center' }
  ];
  public permissionFields = { text: 'name', value: 'id' };
  ENABLE: string = "Enable";
  DISABLE: string = "Disable";

  public groupFields: Object = { text: 'name', value: 'id' };
  @Select(AdminGroupState.getGroups) groups$: Observable<Group[]>;
  @Select(AdminGroupState.getActiveGroups) activeGroups$: Observable<Group[]>;
  @Select(AdminGroupState.getDisabledGroups) disabledGroups$: Observable<Group[]>;

  @Select(AdminPermissionState.getPermissions) getAllPermissions$: Observable<Permission[]>;
  urlparam: string;
  statusChange: string;
  @ViewChild('groupDialog') public permissionDialog: DialogComponent;

  @ViewChild('listviewgroup')
  public groupDialogList: any;

  public target: string = '.control-section';
  permissions: Permission[] = [];

  public saveDlgBtnClick: EmitType<object> = () => {
    this.ShowSpinner(true);
    var permissionData = this.groupDialogList.getSelectedItems().data;
    let permissionidArray: any[] = [];

    permissionData.forEach(permission => {
      permissionidArray.push(permission.id);
    });

    this.selectedGroups.forEach(user => {
      this.store.dispatch(new AssignToPermission(user.id, permissionidArray));
    });


    this.permissionDialog.hide();
    this.store.dispatch(new GetPermissions());
  }

  saveDlgButtons: Object[] = [{ click: this.saveDlgBtnClick.bind(this), buttonModel: { content: 'Save', isPrimary: true } }];

  constructor(protected store: Store, private activatedRoute: ActivatedRoute, protected router: Router) {
    super(store);
    this.Permission = permission.VIEW_GROUP;
    this.ShowLefNav(true);
    this.PageTitle('Admin Groups');
  }

  ngOnInit() {
    this.ShowSpinner(true);
    this.store.dispatch(new GetPermissions());
    this.activatedRoute.params.subscribe(params => {
      this.store.dispatch(new GetGroups());
      this.displayGroups(params.type);
    });
    this.getAllPermissions$.subscribe(permissions => (this.permissions = permissions));

    if (!this.userHasPermission) {
      this.router.navigate(['dashboard']);
    }
  }

  displayGroups(param: string) {
    this.urlparam = param;
    switch (param) {
      case AdminGroupType.Active:
        this.activeGroups$.subscribe(activeGroups => (this.groups = activeGroups));
        this.statusChange = this.DISABLE;
        break;
      case AdminGroupType.Disabled:
        this.disabledGroups$.subscribe(disabledGroups => (this.groups = disabledGroups));
        this.statusChange = this.ENABLE;
        break;
      default:
        break;
    }
  }

  changeGroupStatus(groups: Group[]) {
    this.ShowSpinner(true);
    const lastGroup = groups[groups.length - 1];
    groups.forEach(group => {
      let shouldRefreshList = lastGroup.id === group.id; // Get fresh list of groups only when updating final group
      if (this.statusChange === this.ENABLE) {
        this.store.dispatch(new EnableGroup(group.id, group, shouldRefreshList));
      } else {
        this.store.dispatch(new DisableGroup(group.id, group, shouldRefreshList));
      }
    });
  }
  assignGroupsToPermissions(groups: Group[]) {
    this.permissionDialog.show();
    this.selectedGroups = groups;
  }

  edit(data?: Group) {
    if (!data) {
      this.router.navigate([`/admin/groups/0/edit`]);
    } else {
      this.router.navigate([`/admin/groups/${data.id}/edit`]);
    }
  }
}
