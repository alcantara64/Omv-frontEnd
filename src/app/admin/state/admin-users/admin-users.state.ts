import { State, Action, StateContext, Selector } from "@ngxs/store";
import { tap, mergeMap, map } from "rxjs/operators";
import { AdminUsersService } from "../../../core/services/business/admin-users/admin-users.service";
import {
  GetUsers,
  DeleteUser,
  UpdateUser,
  EnableUser,
  DisableUser,
  GetUser,
  UpdateUserGroups,
  GetUserGroups,
  CreateUser,
  ClearUser,
  ClearUserGroups
} from "./admin-users.actions";
import { User } from "src/app/core/models/entity/user";
import { UserStatus } from "src/app/core/enum/user-status.enum";
import { Group } from "src/app/core/models/entity/group";

export class AdminUserStateModel {
  users: User[];
  currentUserId: number | null;
  currentUser: User;
  groups: Group[];
}

@State<AdminUserStateModel>({
  name: "admin_users",
  defaults: {
    users: [],
    currentUserId: null,
    currentUser: null,
    groups: null
  }
})
export class AdminUserState {
  constructor(private adminUserService: AdminUsersService) {}

  // #region S E L E C T O R S
  @Selector()
  static getUsers(state: AdminUserStateModel) {
    return state.users;
  }

  @Selector()
  static getActiveUsers(state: AdminUserStateModel) {
    return state.users.filter(x => x.status === UserStatus.Active);
  }

  @Selector()
  static getUnassignedUsers(state: AdminUserStateModel) {
    return state.users.filter(x => !x.roleNames);
  }

  @Selector()
  static getDisabledUsers(state: AdminUserStateModel) {
    return state.users.filter(x => x.status === UserStatus.Disabled);
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
  static getGroups(state: AdminUserStateModel) {
    return state.groups;
  }
  //#endregion

  // #region A C T I O N S

  @Action(GetUsers)
  getUsers({ getState, setState }: StateContext<AdminUserStateModel>, { name, groupId }: GetUsers) {
    return this.adminUserService.getUsers(name, groupId).pipe(
      tap(users => {
        const state = getState();
        setState({
          ...state,
          users: users
        });
      })
    );
  }

  @Action(GetUser)
  getUser({ getState, setState }: StateContext<AdminUserStateModel>, { id }: GetUser) {
    return this.adminUserService.getUser(id).pipe(
      tap(user => {
        const state = getState();
        setState({
          ...state,
          currentUser: user ? user : null
        });
      })
    );
  }

  @Action(ClearUser)
  clearUser({ getState, setState }: StateContext<AdminUserStateModel>) {    
    const state = getState();
    setState({
      ...state,
      currentUser: null
    });
  }

  @Action(GetUserGroups)
  getGroups({ getState, setState }: StateContext<AdminUserStateModel>, { userId }: GetUserGroups) {
    return this.adminUserService.getGroups(userId).pipe(
      tap(groups => {
        const state = getState();
        return setState({
          ...state,
          groups: groups
        });
      })
    );
  }

  @Action(ClearUserGroups)
  clearGroups({ getState, setState }: StateContext<AdminUserStateModel>) {    
    const state = getState();
    setState({
      ...state,
      groups: null
    });
  }

  @Action(CreateUser)
  createUser(ctx: StateContext<AdminUserStateModel>, { payload }: CreateUser) {
    return this.adminUserService.createUser(payload).pipe(
      tap(result => {
        console.log('Create User - result: ', result);
        var user = result as User;
        const state = ctx.getState();
        ctx.setState({
          ...state,
          currentUserId: user.userId
        });
      })
    );
  }

  @Action(UpdateUser)
  updateUser(ctx: StateContext<AdminUserStateModel>, { id, payload }: UpdateUser) {
    return this.adminUserService.updateUser(id, payload).pipe(
      tap(result => {}),
      mergeMap(() => ctx.dispatch(new GetUsers()))
    );
  }

  @Action(UpdateUserGroups)
  updateGroups(ctx: StateContext<AdminUserStateModel>, { userid, payload, isAddRoles }: UpdateUserGroups) {
    return this.adminUserService.updateGroups(userid, payload, isAddRoles).subscribe(() => {
      ctx.dispatch(new GetUsers());      
     });
  }

  @Action(DisableUser)
  disableUser(ctx: StateContext<AdminUserStateModel>, { id, payload }: DisableUser) {
    payload.status = 0;
    this.adminUserService.updateUser(id, payload).subscribe(() => {
      ctx.dispatch(new GetUsers());
     });
  }

  @Action(EnableUser)
  enableUser(ctx: StateContext<AdminUserStateModel>, { id, payload }: EnableUser) {
    payload.status = 1;
    this.adminUserService.updateUser(id, payload).subscribe(() => {
      ctx.dispatch(new GetUsers());
     });
  }

  //#endregion
}
