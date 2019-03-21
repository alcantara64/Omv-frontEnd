import { GetUsers, DeleteUser, UpdateUser, EnableUser, DisableUser } from './admin-users.actions';
import { AdminUsersService } from './../../../core/services/business/admin-users/admin-users.service';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { User } from 'src/app/core/models/User';
import { tap, mergeMap } from 'rxjs/operators';
import { AdminUserStatus } from 'src/app/core/enum/admin-user-status';

export class AdminUserStateModel {
  users: User[];
}

@State<AdminUserStateModel>({
  name: 'admin_users',
  defaults: {
    users: []
  } 
})
export class AdminUserState {

  constructor(private adminUserService: AdminUsersService) { }

  @Selector()
  static getActiveUsers(state: AdminUserStateModel) {
    return state.users.filter(x => x.status === AdminUserStatus.Active);
  }

  @Selector()
  static getUnassignedUsers(state: AdminUserStateModel) {
    return state.users.filter(x => !x.isAssigned);
  }

  @Selector()
  static getDisabledUsers(state: AdminUserStateModel) {
    return state.users.filter(x => x.status === AdminUserStatus.Disabled);
  }

  @Action(GetUsers)
  getUsers({getState, setState}: StateContext<AdminUserStateModel>) {
    return this.adminUserService.getUsers().pipe(tap(users => {
        const state = getState();
        setState({
            ...state,
            users: users,
        });
    }));
  }

  @Action(DeleteUser)
  deleteUser(ctx: StateContext<AdminUserStateModel>, {id, payload}: DeleteUser) {
    return this.adminUserService.deleteUser(id, payload).pipe(),
              mergeMap(() => ctx.dispatch(new GetUsers()));
  }

  @Action(DisableUser)
  disableUser(ctx: StateContext<AdminUserStateModel>, {id, payload}: DisableUser) {
    return this.adminUserService.disableUser(id, payload).pipe(),
              mergeMap(() => ctx.dispatch(new GetUsers()));    
  }

  @Action(EnableUser)
  enableUser(ctx: StateContext<AdminUserStateModel>, {id, payload}: EnableUser) {
    return this.adminUserService.enableUser(id, payload).pipe(),
              mergeMap(() => ctx.dispatch(new GetUsers()));
  }
}