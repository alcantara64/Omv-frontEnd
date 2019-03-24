import { Component, OnInit } from '@angular/core';
import { GridColumn } from 'src/app/core/models/grid.column';
import { AdminPermissionState } from '../../admin-permissions/state/admin-permissions.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Permission } from 'src/app/core/enum/permission';
import { GetPermission } from '../../admin-permissions/state/admin-permissions.action';

@Component({
  selector: 'app-admin-group-permissions',
  templateUrl: './admin-group-permissions.component.html',
  styleUrls: ['./admin-group-permissions.component.css']
})
export class AdminGroupPermissionsComponent implements OnInit {

  permissions: Permission[] = [];
  selectedPermission: any[] = [];
  initialRecords: number [] = [];
  columns: GridColumn[] = [
    {type: "checkbox", headerText: "Select All", width: "100", field: ""},
    {type: "", headerText: "Permission Title", width: "", field: "name"}
  ];
  @Select(AdminPermissionState.getPermissions) getPermissions$: Observable<Permission[]>;
  
  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetPermission());

    this.getPermissions$.subscribe(permissions => ( this.permissions = permissions));
  }

}
