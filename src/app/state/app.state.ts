import { ShowLeftNav } from './app.actions';
import { State, Selector, Action, StateContext } from '@ngxs/store';


export class AppStateModel {
  showLeftNav: boolean;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    showLeftNav: false
  }
})
export class AppState {
  
  @Selector()
  static getLeftNavVisibility(state: AppStateModel) { 
    return state.showLeftNav;
  }

  @Action(ShowLeftNav)
  setLeftNavToggle({getState, setState}: StateContext<AppStateModel>, { payload }: ShowLeftNav) {
    const state = getState();
    setState({
      ...state,
      showLeftNav: payload
    });
  }

}
