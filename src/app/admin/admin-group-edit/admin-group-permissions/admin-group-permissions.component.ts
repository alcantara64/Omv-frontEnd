import { UpdateGroupPermissions } from '../../state/admin-groups/admin-groups.action';
import { Component, OnInit } from '@angular/core';
import { GridColumn } from 'src/app/core/models/grid.column';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Permission } from 'src/app/core/enum/permission';
import { AdminGroupState } from '../../state/admin-groups/admin-groups.state';
import { ActivatedRoute } from '@angular/router';
import { GetGroupPermissions } from '../../state/admin-groups/admin-groups.action';
import { takeWhile } from 'rxjs/operators';
import { AdminPermissionState } from '../../state/admin-permissions/admin-permissions.state';
import { GetPermissions } from '../../state/admin-permissions/admin-permissions.action';
import { BaseComponent } from "../../../shared/base/base.component";
import { SetNotification } from 'src/app/state/app.actions';

@Component({
  selector: 'app-admin-group-permissions',
  templateUrl: './admin-group-permissions.component.html',
  styleUrls: ['./admin-group-permissions.component.css']
})
export class AdminGroupPermissionsComponent extends BaseComponent implements OnInit {

  groupId: number;
  componentActive = true;
  permissions: Permission[] = [];
  selectedPermission: any[] = [];
  groupPermissions: string[] = [];
  columns: GridColumn[] = [
    { type: "checkbox", headerText: "Select All", width: "100", field: "" },
    { type: "", headerText: "Permission Title", width: "", field: "name" }
  ];

  @Select(AdminPermissionState.getPermissions) getAllPermissions$: Observable<Permission[]>;
  @Select(AdminGroupState.getPermissionsByGroupId) getUserPermissions$: Observable<Permission[]>;


  constructor(protected store: Store, protected activatedRoute: ActivatedRoute) {
    super(store);
  }

  ngOnInit() {
    this.store.dispatch(new GetPermissions());
    this.activatedRoute.paramMap.subscribe(params => {
      this.groupId = Number(params.get('id'));
    });
    this.getAllPermissions$.subscribe(permissions => {
      this.permissions = permissions;
      this.store.dispatch(new GetGroupPermissions(this.groupId))
        .toPromise().then(() => {
          this.getUserPermissions$.subscribe(permissions => {
            console.log("AdminGroupPermissionsComponent - ngOnInit permissions: " + permissions);
            if (permissions) {
              this.groupPermissions = permissions.map(x => x.id);
            }
          });
        });
    }) , takeWhile(() => this.componentActive);

    // Get the id in the browser url and reach out for the Group
 
  }

ngOnDestroy(): void {
  this.componentActive = false;
}

updatePermissions(permissions: Permission[]) {
  const _permissions = permissions.map(permission => permission.id);
  this.store.dispatch(new UpdateGroupPermissions(this.groupId, _permissions)).toPromise().then(() => {
    this.store.dispatch(new SetNotification('Permission Updated'));
  });
}
}
