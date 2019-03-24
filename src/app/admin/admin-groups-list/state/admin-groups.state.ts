import { Group } from './../../../core/models/group';
import { AdminGroupsService } from './../../../core/services/business/admin-groups/admin-groups.service';
import { GetGroups, DisableGroup, EnableGroup, UpdateGroup, AssignToPermission, GetGroup, CreateGroup, SetCurrentGroupId } from './admin.groups.action';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { tap, mergeMap } from 'rxjs/operators';
import { AdminGroupStatus } from 'src/app/core/enum/admin-user-status';
import { Permission } from 'src/app/core/enum/permission';
import { AdminMembersService } from 'src/app/core/services/business/admin-members/admin-members.service';
import { Member } from 'src/app/core/models/member';

export class AdminGroupStateModel {
  groups: Group[];
  currentGroupId: number | null;
  currentGroup: Group;
  permissions: Permission [];
  members: Member[];
}

@State<AdminGroupStateModel>({
  name: 'admin_groups',
  defaults: {
    groups: [],
    currentGroupId: null,
    currentGroup: null,
    permissions: null,
    members: null
  }
})
export class AdminGroupState {

  //#region S E L E C T O R S

  @Selector()
  static getGroups(state: AdminGroupStateModel) {
    return state.groups;
  }

  @Selector()
  static getUnassignedGroups(state: AdminGroupStateModel) {
    return state.groups.filter(x => !x.isAssigned);
  }

  @Selector()
  static getActiveGroups(state: AdminGroupStateModel) {
    return state.groups.filter(x => x.status === AdminGroupStatus.Active);
  }

  @Selector()
  static getDisabledGroups(state: AdminGroupStateModel) {
    return state.groups.filter(x => x.status === AdminGroupStatus.Disabled);
  }

  @Selector()
  static getCurrentGroupId(state: AdminGroupStateModel) {
    return state.currentGroupId;
  }

  @Selector()
  static getCurrentGroup(state: AdminGroupStateModel) {
    return state.currentGroup;
  }

  @Selector()
  static getMembers(state: AdminGroupStateModel) {
    return state.members;
  }
  //#endregion 

  constructor(private adminGroupService: AdminGroupsService, private adminMembersService: AdminMembersService) { }

  //#region A C T I O N S

  @Action(GetGroups)
  getGroups({ getState, setState }: StateContext<AdminGroupStateModel>) {
    return this.adminGroupService.getGroups().pipe(tap(groups => {
      const state = getState();
      setState({
        ...state,
        groups: groups,
      });
    }));
  }

  @Action(GetGroup)
  getGroup({getState, setState}: StateContext<AdminGroupStateModel>, {id}: GetGroup) {
    return this.adminGroupService.getGroup(id).pipe(tap(group => {
        const state = getState();
        setState({
          ...state,
          currentGroup: group ? group : null
        });
    }));
  }

  @Action(CreateGroup)
  createGroup(ctx: StateContext<AdminGroupStateModel>, {payload}: CreateGroup) {
    return this.adminGroupService.createGroup(payload).pipe(tap(group => {
      console.log('state group: ', group);
      const state = ctx.getState();
      ctx.setState({
        ...state,
        currentGroupId: group.id
      });
      ctx.dispatch(new GetGroups());
    }));
  }

  @Action(UpdateGroup)
  updateGroup(ctx: StateContext<AdminGroupStateModel>, { payload, id }: UpdateGroup) {
    return this.adminGroupService.updateGroup(id, payload).pipe(tap((group) => {
      const state = ctx.getState();
      ctx.setState({
        ...state,
        currentGroup: payload
      });
      ctx.dispatch(new GetGroups());
    }));
  }

  @Action(DisableGroup)
  disableGroup(ctx: StateContext<AdminGroupStateModel>, { id, payload }: DisableGroup) {
    return this.adminGroupService.disableGroup(id, payload).pipe(),
      mergeMap(() => ctx.dispatch(new GetGroups()));
  }

  @Action(EnableGroup)
  enableGroup(ctx: StateContext<AdminGroupStateModel>, { id, payload }: EnableGroup) {
    return this.adminGroupService.enableGroup(id, payload).pipe(),
      mergeMap(() => ctx.dispatch(new GetGroups()));
  }

  @Action(AssignToPermission)
  assignToPermission(ctx: StateContext<AdminGroupStateModel>, { groupid, payload }: AssignToPermission) {
    return this.adminGroupService.assignToGroups(groupid, payload).pipe(),
      mergeMap(() => ctx.dispatch(new GetGroups()));
  }

  @Action(GetMembers)
    getMembers({ getState, setState }: StateContext<AdminGroupStateModel>) {
      return this.adminMembersService.getMembers().pipe(tap(members => {
        const state = getState();
        setState({
          ...state,
          members: members
        });
      }));
    }

    
  @Action(SetCurrentGroupId)
  setCurrentGroupId({ getState, setState }: StateContext<AdminGroupStateModel>, { id }: SetCurrentGroupId) {
    var state = getState();
    return setState({
      ...state,
      currentGroupId: id,
    });
  }

  //#endregion
}