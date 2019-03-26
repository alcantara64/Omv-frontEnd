import { Group } from '../../../core/models/entity/group';
import { AdminGroupsService } from '../../../core/services/business/admin-groups/admin-groups.service';
import { GetGroups, DisableGroup, EnableGroup, UpdateGroup, AssignToPermission, GetGroup, CreateGroup,
        SetCurrentGroupId, GetMembers, GetGroupMembers, GetGroupPermissions, UpdateGroupPermissions, AddGroupMembers, RemoveGroupMembers } from './admin.groups.action';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { tap, mergeMap } from 'rxjs/operators';
import { AdminPermissionsService } from 'src/app/core/services/business/admin-permissions/admin-permissions.service';
import { User } from 'src/app/core/models/entity/user';
import { GroupStatus } from 'src/app/core/enum/group-status.enum';


export class AdminGroupStateModel {
  groups: Group[];
  currentGroupId: number | null;
  currentGroup: Group;
  permissionIds: number[];
  members: User[];

}

@State<AdminGroupStateModel>({
  name: 'admin_groups',
  defaults: {
    groups: [],
    currentGroupId: null,
    currentGroup: null,
    permissionIds: null,
    members: [],

  }
})
export class AdminGroupState {

  //#region S E L E C T O R S

  @Selector()
  static getGroups(state: AdminGroupStateModel) {
    return state.groups;
  }

  @Selector()
  static getActiveGroups(state: AdminGroupStateModel) {
    return state.groups.filter(x => x.status === GroupStatus.Active);
  }

  @Selector()
  static getDisabledGroups(state: AdminGroupStateModel) {
    return state.groups.filter(x => x.status === GroupStatus.Disabled);
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
  static getGroupMembers(state: AdminGroupStateModel) {
    return state.members;
  }

  @Selector()
  static getPermissionsByGroupId(state: AdminGroupStateModel) {
    return state.permissionIds;
  }
  //#endregion

  constructor(private adminGroupService: AdminGroupsService,
    private adminPermissionsService: AdminPermissionsService) { }

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
  getGroup({ getState, setState }: StateContext<AdminGroupStateModel>, { id }: GetGroup) {
    return this.adminGroupService.getGroup(id).pipe(tap(group => {
      const state = getState();
      setState({
        ...state,
        currentGroup: group ? group : null
      });
    }));
  }

  @Action(CreateGroup)
  createGroup(ctx: StateContext<AdminGroupStateModel>, { payload }: CreateGroup) {
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

  @Action(SetCurrentGroupId)
  setCurrentGroupId({ getState, setState }: StateContext<AdminGroupStateModel>, { id }: SetCurrentGroupId) {
    var state = getState();
    return setState({
      ...state,
      currentGroupId: id,
    });
  }

  @Action(GetGroupMembers)
  getGroupMembers({ getState, setState }: StateContext<AdminGroupStateModel>, { groupId }: GetGroupMembers) {
    return this.adminGroupService.getGroupMembers(groupId).pipe(tap(users => {
      const state = getState();
      return setState({
        ...state,
        members: users
      });

    }));
  }

  // @Action(GetGroupPermissions)
  // getGroupPermissions({ getState, setState }: StateContext<AdminGroupStateModel>, { groupId }: GetGroupPermissions) {
  //   return this.adminPermissionsService.getPermissions().pipe(tap(permissions => {
  //     const state = getState();
  //     // const permissionsArr: number[] = [];
  //     // permissions.forEach(group => {
  //     //   if (group.id === 3 || group.id === 2) {
  //     //     permissionsArr.push(group.id);
  //     //   }
  //     // });
  //     // return setState({
  //     //   ...state,
  //     //   permissions: permissions
  //     // });

  //   }));
  // }

  @Action(UpdateGroupPermissions)
  updateGroupPermissions(ctx: StateContext<AdminGroupStateModel>, {groupId, payload}: UpdateGroupPermissions) {
    return this.adminGroupService.updateGroupPermissions(groupId, payload).pipe(tap(() => {

    }));
  }

  @Action(AddGroupMembers)
  addGroupMembers(ctx: StateContext<AdminGroupStateModel>, {groupId, payload}: AddGroupMembers) {
    return this.adminGroupService.addGroupMembers(groupId, payload).pipe(tap(() => {

    }));
  }

  @Action(RemoveGroupMembers)
  removeGroupMembers(ctx: StateContext<AdminGroupStateModel>, {groupId, payload}: RemoveGroupMembers) {
    return this.adminGroupService.removeGroupMembers(groupId, payload).pipe(tap(() => {

    }));
  }

  //#endregion
}
