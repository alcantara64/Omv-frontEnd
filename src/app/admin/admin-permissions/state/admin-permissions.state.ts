import { permission, Permission } from 'src/app/core/enum/permission';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { AdminPermissionsDataService } from 'src/app/core/services/data/admin-permissions/admin-permissions.data.service';
import { GetPermission } from './admin-permissions.action';
import { AdminPermissionsService } from 'src/app/core/services/business/admin-permissions/admin-permissions.service';

export class AdminPermissionStateModel {
  permissions: Permission[];
  currentPermissionId: number | null;
  currentPermission: Permission;
}

@State<AdminPermissionStateModel>({
  name: 'admin_permissions',
  defaults: {
    permissions: [],
    currentPermissionId: null,
    currentPermission: null
  }
})
export class AdminPermissionState {
  
  @Selector()
  static getPermissions(state: AdminPermissionStateModel) {
    return state.permissions;
  }

  constructor(private adminPermissionService: AdminPermissionsService) { }


  @Action(GetPermission)
  getPermissions({ getState, setState }: StateContext<AdminPermissionStateModel>) {
    return this.adminPermissionService.getPermissions().pipe(tap(permission => {
      console.log('permissions: ', permission);
      const state = getState();
      setState({
        ...state,
        permissions: permission,
      });
    }));
  }

}