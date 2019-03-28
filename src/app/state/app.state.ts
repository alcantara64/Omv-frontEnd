import {ClearNotification, messageType, SetNotification, SetPageTitle, ShowLeftNav} from './app.actions';
import {State, Selector, Action, StateContext, Store} from '@ngxs/store';


export class AppStateModel {
  showLeftNav: boolean;
  setPageTitle: string;
  message: string;
  messageType: messageType;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    showLeftNav: false,
    setPageTitle: 'OMV Client Portal',
    message: null,
    messageType: messageType.success,
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
}
