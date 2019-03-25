import { UpdateGroupPermissions } from './../../admin-groups-list/state/admin.groups.action';
import { Component, OnInit } from '@angular/core';
import { GridColumn } from 'src/app/core/models/grid.column';
import { AdminPermissionState } from '../../admin-permissions/state/admin-permissions.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Permission } from 'src/app/core/enum/permission';
import { GetPermission } from '../../admin-permissions/state/admin-permissions.action';
import { AdminGroupState } from '../../admin-groups-list/state/admin-groups.state';
import { ActivatedRoute } from '@angular/router';
import { GetGroupPermissions } from '../../admin-groups-list/state/admin.groups.action';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-admin-group-permissions',
  templateUrl: './admin-group-permissions.component.html',
  styleUrls: ['./admin-group-permissions.component.css']
})
export class AdminGroupPermissionsComponent implements OnInit {

  groupId: number;
  componentActive = true;
  permissions: Permission[] = [];
  selectedPermission: any[] = [];
  initialRecords: number [] = [];
  columns: GridColumn[] = [
    {type: "checkbox", headerText: "Select All", width: "100", field: ""},
    {type: "", headerText: "Permission Title", width: "", field: "name"}
  ];

  @Select(AdminPermissionState.getPermissions) getAllPermissions$: Observable<Permission[]>;
  @Select(AdminGroupState.getPermissionsByGroupId) getUserPermissions$: Observable<number[]>;

  groupPermissions: number[] =[];

  constructor(private store: Store, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.store.dispatch(new GetPermission());

    this.getAllPermissions$.subscribe(permissions => ( this.permissions = permissions));
    this.getUserPermissions$.subscribe(permissions => (this.groupPermissions = permissions));
    
    // Get the id in the browser url and reach out for the Group
    this.activatedRoute.paramMap.subscribe(params => {
      this.groupId = Number(params.get('id'));
      this.store.dispatch(new GetGroupPermissions(this.groupId));
    }), 
    takeWhile(() => this.componentActive);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  updatePermissions(permissions: Permission[]) {
    const _permissions = permissions.map(permission => permission.id);
    this.store.dispatch(new UpdateGroupPermissions(this.groupId, _permissions));
    this.store.dispatch(new GetGroupPermissions(this.groupId));
  }
}
