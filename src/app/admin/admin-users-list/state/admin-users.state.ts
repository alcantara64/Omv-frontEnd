import { UserItem } from 'src/app/core/models/user.item';
import { GetUsers, DeleteUser, UpdateUser, EnableUser, DisableUser, SearchUsers, SetCurrentUserId, GetUser, AssignToGroups, GetGroupsByUserId } from './admin-users.actions';
import { AdminUsersService } from './../../../core/services/business/admin-users/admin-users.service';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { User } from 'src/app/core/models/User';
import { tap, mergeMap } from 'rxjs/operators';
import { AdminUserStatus } from 'src/app/core/enum/admin-user-status';
import { userType } from 'src/app/core/enum/permission';

export class AdminUserStateModel {
  users: User[];
  currentUserId: number | null;
  currentUser: UserItem;
  userGroupIds: number[];
}

@State<AdminUserStateModel>({
  name: 'admin_users',
  defaults: {
    users: [],
    currentUserId: null,
    currentUser: null,
    userGroupIds: null
  }
})
export class AdminUserState {

  constructor(private adminUserService: AdminUsersService) { }

  // #region S E L E C T O R S
  @Selector()
  static getUsers(state: AdminUserStateModel) {
    return state.users;
  }

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

  @Selector()
  static getCurrentUserId(state: AdminUserStateModel) {
    return state.currentUserId;
  }

  @Selector()
  static getCurrentUser(state: AdminUserStateModel) {
    return state.currentUser;
  }

  @Selector()
  static getGroupsByUserId(state: AdminUserStateModel) {
    return state.userGroupIds;
  }
  //#endregion 

  // #region A C T I O N S

  @Action(GetUsers)
  getUsers({ getState, setState }: StateContext<AdminUserStateModel>) {
    return this.adminUserService.getUsers().pipe(tap(users => {
      const state = getState();
      setState({
        ...state,
        users: users,
      });
    }));
  }

  @Action(GetGroupsByUserId)
  getGroupsByUserId({ getState, setState }: StateContext<AdminUserStateModel>, { userId }: GetGroupsByUserId) {
    return this.adminUserService.getGroupsByUserId(userId).pipe(tap(groups => {
      const state = getState();
      const groupArr: number [] = [];
      groups.forEach(group => {
          groupArr.push(group.id);
      });
      return setState({
        ...state,
        userGroupIds: groupArr
      });

    }));
  }

  @Action(GetUser)
  getUser({ getState, setState }: StateContext<AdminUserStateModel>, { id }: GetUser) {
    return this.adminUserService.getUser(id).pipe(tap(user => {
      const state = getState();
      setState({
        ...state,
        currentUser: user,
      });
    }));
  }

  @Action(SearchUsers)
  searchUsers({ getState, setState }: StateContext<AdminUserStateModel>, { name, groupid }: SearchUsers) {
    var state = getState();
    var users = state.users;
    console.log('search Users Action: ', users);
    return setState({
      ...state,
      users: users.filter(x => x.name === name),
    });
  }

  @Action(DeleteUser)
  deleteUser(ctx: StateContext<AdminUserStateModel>, { id, payload }: DeleteUser) {
    return this.adminUserService.deleteUser(id, payload).pipe(),
      mergeMap(() => ctx.dispatch(new GetUsers()));
  }

  @Action(DisableUser)
  disableUser(ctx: StateContext<AdminUserStateModel>, { id, payload }: DisableUser) {
    return this.adminUserService.disableUser(id, payload).pipe(),
      mergeMap(() => ctx.dispatch(new GetUsers()));
  }

  @Action(EnableUser)
  enableUser(ctx: StateContext<AdminUserStateModel>, { id, payload }: EnableUser) {
    return this.adminUserService.enableUser(id, payload).pipe(),
      mergeMap(() => ctx.dispatch(new GetUsers()));
  }

  @Action(SetCurrentUserId)
  setCurrentUserId({ getState, setState }: StateContext<AdminUserStateModel>, { id }: SetCurrentUserId) {
    var state = getState();
    return setState({
      ...state,
      currentUserId: id,
    });
  }

  @Action(AssignToGroups)
  assignToGroups(ctx: StateContext<AdminUserStateModel>, { userid, payload }: AssignToGroups) {
    return this.adminUserService.assignToGroups(userid, payload).pipe(),
      mergeMap(() => ctx.dispatch(new GetUsers()));
  }



  //#endregion 
}
