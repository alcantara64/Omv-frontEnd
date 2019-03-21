import { Group } from './../../../core/models/group';
import { AdminGroupsService } from './../../../core/services/business/admin-groups/admin-groups.service';
import { GetGroups, DisableGroup, EnableGroup, UpdateGroup } from './admin.groups.action';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { tap, mergeMap } from 'rxjs/operators';

export class AdminGroupStateModel {
  groups: Group[];
  currentGroup: Group;
}

@State<AdminGroupStateModel>({
  name: 'groups',
  defaults: {
    groups: [],
    currentGroup: null
  }
})
export class AdminGroupState {

  @Selector()
  static getGroups(state: AdminGroupStateModel) {
    return state.groups;
  }

  @Selector()
  static getCurrentGroup(state: AdminGroupStateModel) {
    return state.currentGroup;
  }

  constructor(private adminGroupService: AdminGroupsService) { }

  @Action(GetGroups)
  getGroups({getState, setState}: StateContext<AdminGroupStateModel>) {
    return this.adminGroupService.getGroups().pipe(tap(groups => {
        const state = getState();
        setState({
            ...state,
            groups: groups,
        });
    }));
  }

  @Action(DisableGroup)
  disableGroup(ctx: StateContext<AdminGroupStateModel>, {id, payload}: DisableGroup) {
    return this.adminGroupService.disableGroup(id, payload).pipe(),
              mergeMap(() => ctx.dispatch(new GetGroups()));
  }

  @Action(EnableGroup)
  enableGroup(ctx: StateContext<AdminGroupStateModel>, {id, payload}: EnableGroup) {
    return this.adminGroupService.enableGroup(id, payload).pipe(),
              mergeMap(() => ctx.dispatch(new GetGroups()));
  }

  @Action(UpdateGroup)
    updateGroup({getState, setState}: StateContext<AdminGroupStateModel>, {payload, id}: UpdateGroup) {
        return this.adminGroupService.updateGroup(id, payload).pipe(tap((group) => {
            const state = getState();
            const groupList = [...state.groups];
            const groupIndex = groupList.findIndex(item => item.id === id);
            groupList[groupIndex] = payload;
            setState({
                ...state,
                groups: groupList,
            });
        }));
    }

}