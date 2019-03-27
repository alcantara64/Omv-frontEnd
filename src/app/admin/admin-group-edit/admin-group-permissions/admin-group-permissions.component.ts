import { UpdateGroupPermissions } from '../../state/admin-groups/admin.groups.action';
import { Component, OnInit } from '@angular/core';
import { GridColumn } from 'src/app/core/models/grid.column';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Permission } from 'src/app/core/enum/permission';
import { AdminGroupState } from '../../state/admin-groups/admin-groups.state';
import { ActivatedRoute } from '@angular/router';
import { GetGroupPermissions } from '../../state/admin-groups/admin.groups.action';
import { takeWhile } from 'rxjs/operators';
import { AdminPermissionState } from '../../state/admin-permissions/admin-permissions.state';
import { GetPermissions } from '../../state/admin-permissions/admin-permissions.action';

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
    this.store.dispatch(new GetPermissions());

    this.getAllPermissions$.subscribe(permissions => this.permissions = permissions);
    
    // Get the id in the browser url and reach out for the Group
    this.activatedRoute.paramMap.subscribe(params => {
      this.groupId = Number(params.get('id'));
      this.store.dispatch(new GetGroupPermissions(this.groupId));
    }), 
    takeWhile(() => this.componentActive);
    
    this.getUserPermissions$.subscribe(permissions => this.groupPermissions = permissions);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  updatePermissions(permissions: Permission[]) {
    const _permissions = permissions.map(permission => Number(permission.id));
    this.store.dispatch(new UpdateGroupPermissions(this.groupId, _permissions));
    this.store.dispatch(new GetGroupPermissions(this.groupId));
  }
}
