import {
  ShowConfirmationBox,
  ClearNotification,
  Confirmation,
  messageType,
  SetNotification,
  ClearConfirmation, 
  SetPageTitle, ShowLeftNav, SetLoggedInUser, LogOut, GetUserPermissions, GetLoggedInUser, DisplayToastMessage
} from './app.actions';
import {State, Selector, Action, StateContext, Store} from '@ngxs/store';
import { AdminUsersService } from './../core/services/business/admin-users/admin-users.service';
import { AuthService } from '../core/services/business/auth.service';
import { Permission } from '../core/enum/permission';
import { GetPermissions } from '../admin/state/admin-permissions/admin-permissions.action';
import { GetUser } from '../admin/state/admin-users/admin-users.actions';
import { tap } from 'rxjs/operators';
import { Toast } from '../core/enum/toast';

export class AppStateModel {
  showLeftNav: boolean;
  setPageTitle: string;
  currentUser: any;
  currentUserId: number;
  permissions: Permission[];
  message: string;
  messageType: messageType;
  confirmationBox: boolean;
  confirmation: boolean;

  toastMessage?: Toast;
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

    toastMessage: null
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

  @Selector()
  static getToastMessage(state: AppStateModel) {
    return state.toastMessage;
  }  

  @Selector()
  static setNotification(state: AppStateModel) {
    return {message: state.message, messageType: state.messageType};
  }

  @Selector()
  static showConfirmationBox(state: AppStateModel) {
    return state.confirmationBox;
  }

  @Selector()
  static confirmation(state: AppStateModel) {
    return state.confirmation;
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

  @Action(ClearNotification)
  clearNotification({getState,setState}: StateContext<AppStateModel>) {
    const state = getState();
    setState({
      ...state,
      message: null,
      messageType: messageType.success
    })
  }

  @Action(SetNotification)
  setNotification(ctx: StateContext<AppStateModel>, {message, messageType}: SetNotification) {
    ctx.dispatch(new ClearNotification);
    const state = ctx.getState();

    setTimeout(()=>{
      ctx.setState({
        ...state,
        message: message,
        messageType: messageType
      });

      setTimeout(()=>{
        ctx.dispatch(new ClearNotification)
      }, 10000);

    }, 1)
  }

  @Action(ShowConfirmationBox)
  showConfirmationBox({getState, setState}: StateContext<AppStateModel>, {show}: ShowConfirmationBox) {
    const state = getState();

    setState({
      ...state,
      confirmationBox: show,
    });

  }

  @Action(ClearConfirmation)
  clearConfirmation({getState, setState}: StateContext<AppStateModel>) {
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
    setTimeout(()=>{
      ctx.dispatch(new ClearConfirmation)
    }, 100)
  }

  @Action(DisplayToastMessage)
  displayToastMessage({getState, setState}: StateContext<AppStateModel>, { message, type }: DisplayToastMessage) {
    const state = getState();

    const toast: Toast = { message: message, type: type };
    setState({
      ...state,
      toastMessage: toast
    });
  }

}
