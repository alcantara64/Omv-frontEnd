import { Permission } from 'src/app/core/enum/permission';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { GetPermissions } from './admin-permissions.action';
import { AdminPermissionsService } from 'src/app/core/services/business/admin-permissions/admin-permissions.service';


export class AdminPermissionStateModel {
  permissions: Permission[];
}

@State<AdminPermissionStateModel>({
  name: 'admin_permissions',
  defaults: {
    permissions:[]
  }
})
export class AdminPermissionState {

  @Selector()
  static getPermissions(state: AdminPermissionStateModel) {
    return state.permissions;
  }

  constructor(private adminPermissionService: AdminPermissionsService) { }


  @Action(GetPermissions)
  getPermissions({ getState, setState }: StateContext<AdminPermissionStateModel>) {
    return this.adminPermissionService.getPermissions().pipe(
      tap(permission => {
      const state = getState();
      setState({
        ...state,
        permissions: permission,
      });
    }));
  }


}
