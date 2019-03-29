import { Group } from '../../../core/models/entity/group';
import { AdminGroupsService } from '../../../core/services/business/admin-groups/admin-groups.service';
import {
  GetGroups, DisableGroup, EnableGroup, UpdateGroup, AssignToPermission, GetGroup, CreateGroup,
  SetCurrentGroupId, GetMembers, GetGroupMembers, GetGroupPermissions, UpdateGroupPermissions, AddGroupMembers, RemoveGroupMembers, GetMediaAccess, ClearGroup
} from './admin.groups.action';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { tap, mergeMap } from 'rxjs/operators';
import { AdminPermissionsService } from 'src/app/core/services/business/admin-permissions/admin-permissions.service';
import { User } from 'src/app/core/models/entity/user';
import { GroupStatus } from 'src/app/core/enum/group-status.enum';
import { AdminMediaAccessService } from 'src/app/core/services/business/admin-media-access/admin-media-access.service';
import { MediaAccess } from 'src/app/core/models/media-access';
import { Permission } from 'src/app/core/enum/permission';


export class AdminGroupStateModel {
  groups: Group[];
  currentGroupId: number | null;
  currentGroup: Group;
  currentGroupPermission: Permission[];
  currentGroupmediaAccess: MediaAccess;
  currentGroupmembers: User[];

}

@State<AdminGroupStateModel>({
  name: 'admin_groups',
  defaults: {
    groups: [],
    currentGroupId: null,
    currentGroup: null,
    currentGroupPermission: null,
    currentGroupmediaAccess: null,
    currentGroupmembers: [],

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
    return state.groups.filter(x => x.status === 0);
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
    return state.currentGroupmembers;
  }

  @Selector()
  static getMediaAccess(state: AdminGroupStateModel) {
    return state.currentGroupmediaAccess;
  }

  @Selector()
  static getPermissionsByGroupId(state: AdminGroupStateModel) {
    console.log(" AdminGroupState - getPermissionsByGroupId " + state.currentGroupPermission);
    return state.currentGroupPermission;
  }
  //#endregion

  constructor(private adminGroupService: AdminGroupsService,
    private adminPermissionService: AdminPermissionsService,
    private adminMediaAccessService: AdminMediaAccessService) { }

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

  @Action(ClearGroup)
  clearGroup({ getState, setState }: StateContext<AdminGroupStateModel>) {
    const state = getState();
    setState({
      ...state,
      currentGroup: null
    });
  }

  @Action(CreateGroup)
  createGroup(ctx: StateContext<AdminGroupStateModel>, { payload }: CreateGroup) {
    return this.adminGroupService.createGroup(payload).pipe(
      tap(result => {
        console.log('state group: ', result);
        const group = result as Group;
        const state = ctx.getState();
        ctx.setState({
          ...state,
          currentGroupId: group.id
        });
        ctx.dispatch(new GetGroups());
      })
    );
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
    payload.status = 0;
    return this.adminGroupService.updateGroup(id, payload).subscribe(
      () => { ctx.dispatch(new GetGroups()); });
  }

  @Action(EnableGroup)
  enableGroup(ctx: StateContext<AdminGroupStateModel>, { id, payload }: EnableGroup) {
    payload.status = 1;
    return this.adminGroupService.updateGroup(id, payload).subscribe(() => {
      ctx.dispatch(new GetGroups());
    });
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
        currentGroupmembers: users
      });

    }));
  }

   @Action(GetGroupPermissions)
   getGroupPermissions({ getState, setState }: StateContext<AdminGroupStateModel>, { groupId }: GetGroupPermissions) {
     return this.adminGroupService.getGroupPermissions(groupId).pipe(tap(permissions => {
       const state = getState();

        return setState({
          ...state,
          currentGroupPermission: permissions
        });

     }));
   }

  @Action(GetMediaAccess)
  getMediaAccess({ getState, setState }: StateContext<AdminGroupStateModel>) {
    return this.adminMediaAccessService.getMediaAccess().pipe(tap(mediaAccess => {
      const state = getState();
      setState({
        ...state,
        currentGroupmediaAccess: mediaAccess
      });
    }));
  }

  @Action(UpdateGroupPermissions)
  updateGroupPermissions(ctx: StateContext<AdminGroupStateModel>, { groupId, payload }: UpdateGroupPermissions) {
    return this.adminGroupService.updateGroupPermissions(groupId, payload).pipe(tap(() => {

    }));
  }

  @Action(AddGroupMembers)
  addGroupMembers(ctx: StateContext<AdminGroupStateModel>, { groupId, payload }: AddGroupMembers) {
    return this.adminGroupService.addGroupMembers(groupId, payload).pipe(tap(() => {

    }));
  }

  @Action(RemoveGroupMembers)
  removeGroupMembers(ctx: StateContext<AdminGroupStateModel>, { groupId, payload }: RemoveGroupMembers) {
    return this.adminGroupService.removeGroupMembers(groupId, payload).pipe(tap(() => {

    }));
  }

  //#endregion
}
