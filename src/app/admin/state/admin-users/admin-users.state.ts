import { State, Action, StateContext, Selector } from "@ngxs/store";
import { tap, mergeMap, map } from "rxjs/operators";
import { AdminUsersService } from "../../../core/services/business/admin-users/admin-users.service";
import {
  GetUsers,
  UpdateUser,
  EnableUser,
  DisableUser,
  GetUser,
  UpdateUserGroups,
  GetUserGroups,
  CreateUser,
  InitializeUser,
  ClearUserGroups
} from "./admin-users.actions";
import { User } from "src/app/core/models/entity/user";
import { UserStatus } from "src/app/core/enum/user-status.enum";
import { Group } from "src/app/core/models/entity/group";
import { DisplayToastMessage } from 'src/app/state/app.actions';
import { ToastType } from 'src/app/core/enum/toast';
import { DateService } from 'src/app/core/services/business/dates/date.service';

export class AdminUserStateModel {
  users: User[];
  currentUserId: number;
  currentUser: User;
  groups: Group[];
  error: string;
}

const initialUser: User = {
  userId: 0,
  displayName: '',
  firstName: '',
  lastName: '',
  userName: '',
  emailAddress: '',
  roleNames: '',
  status: 1
}

@State<AdminUserStateModel>({
  name: "admin_users",
  defaults: {
    users: [],
    currentUserId: null,
    currentUser: null,
    groups: [],
    error: ''
  }
})
export class AdminUserState {
  constructor(private adminUserService: AdminUsersService, private dateService: DateService) {}

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
    return state.users.filter(x => !x.roleNames &&  x.status === UserStatus.Active);
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
      tap(response => {
        let users = response.data;
        const state = getState();
        users.map(user => {
          user.modifiedOnString = this.dateService.formatToString(user.modifiedOn);
        });

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

  @Action(InitializeUser)
  initializeUser({ getState, setState }: StateContext<AdminUserStateModel>) {
    const state = getState();
    setState({
      ...state,
      currentUser: initialUser
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
        ctx.dispatch(new DisplayToastMessage("User created successfully"));
        var user = result as User;
        const state = ctx.getState();
        ctx.setState({
          ...state,
          currentUserId: user.userId
        });
      }, (err) => {
        ctx.dispatch(new DisplayToastMessage(err.error, ToastType.error));
      })
    );
  }

  @Action(UpdateUser)
  updateUser(ctx: StateContext<AdminUserStateModel>, { id, payload }: UpdateUser) {
    return this.adminUserService.updateUser(id, payload).pipe(
      tap(user => {
        ctx.dispatch(new DisplayToastMessage("User updated successfully"));
      },(err) => {
        ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
      })
    );
  }

  @Action(UpdateUserGroups)
  updateGroups(ctx: StateContext<AdminUserStateModel>, { userid, payload, isAddRoles, refreshList }: UpdateUserGroups) {
    return this.adminUserService.updateGroups(userid, payload, isAddRoles).pipe(
      tap((response) => {
        if (refreshList) {
          ctx.dispatch(new DisplayToastMessage("Groups were updated successfully."));
          ctx.dispatch(new GetUsers());
        } 
        if (!isAddRoles) {
          var state = ctx.getState();
          var user = state.currentUser;
          ctx.dispatch(new DisplayToastMessage(`${user.displayName}'s groups were updated successfully.`));
        }}, (err) => {
          ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
        })
    );
  }

  @Action(DisableUser)
  disableUser(ctx: StateContext<AdminUserStateModel>, { id, payload, isMultiple, refreshList }: DisableUser) {
    payload.status = 0;
    this.adminUserService.updateUser(id, payload).subscribe(user => {
      console.log('AdminUserState - disableUser: response ', user);
      if (!isMultiple) {
        ctx.dispatch(new DisplayToastMessage(`${user.displayName} was disabled successfully.`));
      }
      if (refreshList) {
        ctx.dispatch(new GetUsers());
        ctx.dispatch(new DisplayToastMessage("Successfully disabled user(s)"));
      }
    }, err => {
      ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
    });
  }

  @Action(EnableUser)
  enableUser(ctx: StateContext<AdminUserStateModel>, { id, payload, isMultiple, refreshList }: EnableUser) {
    payload.status = 1;
    this.adminUserService.updateUser(id, payload).subscribe(user => {
      if (!isMultiple) {
        ctx.dispatch(new DisplayToastMessage(`${user.displayName} was enabled successfully.`));
      }
      if (refreshList) {
        ctx.dispatch(new GetUsers());
        ctx.dispatch(new DisplayToastMessage("Successfully enabling user(s)"));
      }
    }, err => {
        ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
    });
  }

  //#endregion
}
