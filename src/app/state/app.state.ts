import {
  ShowConfirmationBox,
  ClearNotification,
  Confirmation,
  messageType,
  SetNotification,
  SetPageTitle,
  ShowLeftNav, ClearConfirmation
} from './app.actions';
import {State, Selector, Action, StateContext, Store} from '@ngxs/store';


export class AppStateModel {
  showLeftNav: boolean;
  setPageTitle: string;
  message: string;
  messageType: messageType;
  confirmationBox: boolean;
  confirmation: boolean;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    showLeftNav: false,
    setPageTitle: 'OMV Client Portal',
    message: null,
    messageType: messageType.success,
    confirmationBox: false,
    confirmation: false,
  }
})
export class AppState {

  constructor(protected store: Store) {}

  @Selector()
  static getLeftNavVisibility(state: AppStateModel) {
    return state.showLeftNav;
  }

  @Selector()
  static getPageTitle(state: AppStateModel) {
    return state.setPageTitle;
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
  setNotification({getState, setState}: StateContext<AppStateModel>, {message, messageType}: SetNotification) {
    this.store.dispatch(new ClearNotification);
    const state = getState();

    setTimeout(()=>{
      setState({
        ...state,
        message: message,
        messageType: messageType
      });

      setTimeout(()=>{
        this.store.dispatch(new ClearNotification)
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
  confirmation({getState, setState}: StateContext<AppStateModel>) {
    const state = getState();

    setState({
      ...state,
      confirmation: true,
    });

    setTimeout(()=>{
      this.store.dispatch(new ClearConfirmation)
    }, 100)
  }
}
