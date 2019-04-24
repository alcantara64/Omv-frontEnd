import {
  ShowConfirmationBox,
  ClearNotification,
  Confirmation,
  messageType,
  ClearConfirmation,
  SetPageTitle,
  ShowLeftNav,
  LogOut,
  GetUserPermissions,
  GetLoggedInUser,
  DisplayToastMessage,
  DeviceWidth,
  ShowSpinner,
  HideSpinner,
  AuthenticateUser
} from './app.actions';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { AdminUsersService } from './../core/services/business/admin-users/admin-users.service';
import { AuthService } from '../core/services/business/auth.service';
import { Permission } from '../core/enum/permission';
import { tap } from 'rxjs/operators';
import { Toast } from '../core/enum/toast';
import { UsersDataService } from '../core/services/data/users/users.data.service';
import { User } from '../core/models/entity/user';
import { Router } from '@angular/router';

export class AppStateModel {
  showLeftNav: boolean;
  setPageTitle: string;
  currentUser: User;
  currentUserId: number;
  permissions: Permission[];
  message: string;
  messageType: messageType;
  confirmationBox: boolean;
  confirmation: boolean;

  toastMessage?: Toast;
  error: string;
  deviceWidth: number;
  gridData: any[];
  showSpinner: boolean;

  isUserAuthenticated: boolean;
  isAuthorized: boolean;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    showLeftNav: false,
    setPageTitle: 'OMV Client Portal',
    currentUser: null,
    currentUserId: 1,
    permissions: [],
    message: null,
    messageType: messageType.success,
    confirmationBox: false,
    confirmation: false,

    toastMessage: null,
    error: '',
    deviceWidth: window.innerWidth,
    gridData: [],
    showSpinner: false,

    isUserAuthenticated: null,
    isAuthorized: false
  }
})
export class AppState {

  @Selector()
  static getLeftNavVisibility(state: AppStateModel) {
    return state.showLeftNav;
  }

  @Selector()
  static getSpinnerVisibility(state: AppStateModel) {
    return state.showSpinner;
  }

  @Selector()
  static getPageTitle(state: AppStateModel) {
    return state.setPageTitle;
  }

  @Selector()
  static getLoggedInUser(state: AppStateModel) {
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

  @Selector()
  static getToastMessage(state: AppStateModel) {
    return state.toastMessage;
  }

  @Selector()
  static setNotification(state: AppStateModel) {
    return { message: state.message, messageType: state.messageType };
  }

  @Selector()
  static showConfirmationBox(state: AppStateModel) {
    return state.confirmationBox;
  }

  @Selector()
  static confirmation(state: AppStateModel) {
    return state.confirmation;
  }

  @Selector()
  static getErrorMessage(state: AppStateModel) {
    return state.error;
  }

  @Selector()
  static setDeviceWidth(state: AppStateModel) {
    return state.deviceWidth;
  }

  @Selector()
  static getIsUserAuthenticated(state: AppStateModel) {
    return state.isUserAuthenticated;
  }

  @Selector()
  static getIsAuthorized(state: AppStateModel) {
    return state.isAuthorized;
  }

  constructor(private auth: AuthService, private adminUsersService: AdminUsersService, private usersDataService: UsersDataService, private router: Router) { }

  @Action(ShowLeftNav)
  setLeftNavToggle({ getState, setState }: StateContext<AppStateModel>, { payload }: ShowLeftNav) {
    const state = getState();
    setState({
      ...state,
      showLeftNav: payload
    });
  }

  @Action(ShowSpinner)
  showSpinner({ getState, setState }: StateContext<AppStateModel>) {
    const state = getState();
    setState({
      ...state,
      showSpinner: true
    });
  }

  @Action(HideSpinner)
  hideSpinner({ getState, setState }: StateContext<AppStateModel>) {
    const state = getState();
    setState({
      ...state,
      showSpinner: false
    });
  }

  @Action(SetPageTitle)
  setPageTitle({ getState, setState }: StateContext<AppStateModel>, { payload }: SetPageTitle) {
    const state = getState();
    setState({
      ...state,
      setPageTitle: payload
    });
  }

  @Action(GetLoggedInUser)
  getLoggedinUser(ctx: StateContext<AppStateModel>) {
    return this.usersDataService.getLoggedInUser()
      .pipe(
        tap(user => {

          const state = ctx.getState();
          ctx.setState({
            ...state,
            currentUser: user,
            isAuthorized: true
          });
          const return_url = localStorage.getItem('return_url')
          this.router.navigate([return_url]);
        }, err => {
          console.log('App State getLoggedinUser', err);
          const state = ctx.getState();
          ctx.setState({
            ...state,
            currentUser: null,
            isAuthorized: false
          });
          if (err.status === 404) {
            this.auth.logout();
            this.router.navigate(['/unauthorize']);
          }          
        })
      );
  }

  @Action(AuthenticateUser)
  async authenticateUser({ getState, setState }: StateContext<AppStateModel>) {
    let isAuthenticated = await this.auth.isAuthenticated();
    const state = getState();
    setState({
      ...state,
      isUserAuthenticated: isAuthenticated
    });
  }

  @Action(LogOut)
  async logOut({ getState, setState }: StateContext<AppStateModel>) {
    await this.auth.logout().then(() => {
      const state = getState();
      setState({
        ...state,
        currentUser: null,
        isUserAuthenticated: false
      });
    });
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

  @Action(ClearNotification)
  clearNotification({ getState, setState }: StateContext<AppStateModel>) {
    const state = getState();
    setState({
      ...state,
      message: null,
      messageType: messageType.success
    })
  }

  @Action(ShowConfirmationBox)
  showConfirmationBox({ getState, setState }: StateContext<AppStateModel>, { show }: ShowConfirmationBox) {
    const state = getState();

    setState({
      ...state,
      confirmationBox: show,
    });

  }

  @Action(ClearConfirmation)
  clearConfirmation({ getState, setState }: StateContext<AppStateModel>) {
    const state = getState();

    setState({
      ...state,
      confirmation: false,
    });
  }

  @Action(Confirmation)
  confirmation(ctx: StateContext<AppStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      confirmation: true
    });
    setTimeout(() => {
      ctx.dispatch(new ClearConfirmation)
    }, 100)
  }

  @Action(DisplayToastMessage)
  displayToastMessage({ getState, setState }: StateContext<AppStateModel>, { message, type }: DisplayToastMessage) {
    const state = getState();

    const toast: Toast = { message: message, type: type };
    setState({
      ...state,
      toastMessage: toast
    });
  }

  @Action(DeviceWidth)
  DeviceWidth({ getState, setState }: StateContext<AppStateModel>, { deviceWidth }: DeviceWidth) {
    const state = getState();

    setState({
      ...state,
      deviceWidth: deviceWidth,
    });
  }
}
