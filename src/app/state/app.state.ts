import { AdminUsersService } from './../core/services/business/admin-users/admin-users.service';
import { SetPageTitle, ShowLeftNav, SetLoggedInUser, LogOut, GetUserPermissions, GetLoggedInUser } from './app.actions';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { AuthService } from '../core/services/business/auth.service';
import { Permission } from '../core/enum/permission';
import { GetPermissions } from '../admin/state/admin-permissions/admin-permissions.action';
import { GetUser } from '../admin/state/admin-users/admin-users.actions';
import { tap } from 'rxjs/operators';


export class AppStateModel {
  showLeftNav: boolean;
  setPageTitle: string;
  currentUser: any;
  currentUserId: number;
  permissions: Permission[];
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    showLeftNav: false,
    setPageTitle: 'OMV Client Portal',
    currentUser: null,
    currentUserId: 1,
    permissions: []
  }
})
export class AppState {
  
  @Selector()
  static getLeftNavVisibility(state: AppStateModel) { 
    return state.showLeftNav;
  }

  @Selector()
  static getPageTitle(state: AppStateModel) {
    return state.setPageTitle;
  }

  @Selector()
  static getCurrentUser(state: AppStateModel) {
    return state.currentUser;
  }

  @Selector()
  static getCurrentUserId(state: AppStateModel) {
    return state.currentUserId;
  }

  @Selector()
  static getUserPermissions(state: AppStateModel) {
    return state.permissions;
  }

  constructor(private authService: AuthService, private adminUsersService: AdminUsersService) { }

  @Action(ShowLeftNav)
  setLeftNavToggle({getState, setState}: StateContext<AppStateModel>, { payload }: ShowLeftNav) {
    const state = getState();
    setState({
      ...state,
      showLeftNav: payload
    });
  }

  @Action(SetPageTitle)
  setPageTitle({getState, setState}: StateContext<AppStateModel>, { payload }: SetPageTitle) {
    const state = getState();
    setState({
      ...state,
      setPageTitle: payload
    });
  }

  @Action(GetLoggedInUser)
  getLoggedinUser({ getState, setState }: StateContext<AppStateModel>, { userId }: GetLoggedInUser) {
    return this.adminUsersService.getUser(userId).pipe(
      tap(user => {
        const state = getState();
        setState({
          ...state,
          currentUser: user
        });
      })
    );
  }

  @Action(SetLoggedInUser)
  setLoggedInUser({getState, setState}: StateContext<AppStateModel>, { payload }: SetPageTitle) {
    const state = getState();
    setState({
      ...state,
      currentUser: payload
    });
  }

  @Action(LogOut)
  logOut({getState, setState}: StateContext<AppStateModel>, { payload }: SetPageTitle) {
    const state = getState();
    setState({
      ...state,
      currentUser: null
    });
    return this.authService.logOut();    
  }

  @Action(GetUserPermissions)
  getUserPermissions({ getState, setState }: StateContext<AppStateModel>, { userId }: GetUserPermissions) {
    return this.adminUsersService.getPermissions(userId).pipe(
      tap(permissions => {
        const state = getState();
        setState({
          ...state,
          permissions: permissions
        });
      })
    );
  }
}
