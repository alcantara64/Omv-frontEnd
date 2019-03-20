import { AdminUsersService } from './../../../core/services/business/admin-users/admin-users.service';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { User } from 'src/app/core/models/User';
import { GetUsers } from '../state/admin-users.actions';
import { tap } from 'rxjs/operators';
import { AdminUserStatus } from 'src/app/core/enum/admin-user-status';

export class AdminUserStateModel {
  users: User[];
}

@State<AdminUserStateModel>({
  name: 'users',
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
    return this.adminUserService.getUsers().pipe(tap((users) => {
        const state = getState();
        setState({
            ...state,
            users: users,
        });
    }));
  }
}