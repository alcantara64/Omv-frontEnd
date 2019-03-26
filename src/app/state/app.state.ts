import {SetPageTitle, ShowLeftNav} from './app.actions';
import { State, Selector, Action, StateContext } from '@ngxs/store';


export class AppStateModel {
  showLeftNav: boolean;
  setPageTitle: string
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    showLeftNav: false,
    setPageTitle: 'OMV Client Portal'
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

}
