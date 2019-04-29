import { Group } from '../../../core/models/entity/group';
import { AdminGroupsService } from '../../../core/services/business/admin-groups/admin-groups.service';
import {
  GetGroups, DisableGroup, EnableGroup, UpdateGroup, AssignToPermission, GetGroup, CreateGroup,
  SetCurrentGroupId, GetMembers, GetGroupMembers, GetGroupPermissions, UpdateGroupPermissions, AddGroupMembers, RemoveGroupMembers, GetMediaAccess, ClearGroup, GetRoleMediaAccess, UpdateRoleMediaAccess
} from './admin-groups.action';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { tap, mergeMap, map } from 'rxjs/operators';
import { AdminPermissionsService } from 'src/app/core/services/business/admin-permissions/admin-permissions.service';
import { User } from 'src/app/core/models/entity/user';
import { GroupStatus } from 'src/app/core/enum/group-status.enum';
import { AdminMediaAccessService } from 'src/app/core/services/business/admin-media-access/admin-media-access.service';
import { MediaAccess } from 'src/app/core/models/media-access';
import { Permission } from 'src/app/core/enum/permission';
import { Directory_GetAllOutputDTO } from 'src/app/core/dtos/output/directories/Directory_GetAllOutputDTO';
import { DisplayToastMessage } from 'src/app/state/app.actions';
import { ToastType } from 'src/app/core/enum/toast';
import { formatDate } from '@angular/common';
import { DateService } from 'src/app/core/services/business/dates/date.service';


export class AdminGroupStateModel {
  groups: Group[];
  currentGroupId: number;
  currentGroup: Group;
  currentGroupPermission: Permission[];
  currentGroupmediaAccess: Directory_GetAllOutputDTO;
  currentGroupmembers: User[];
  currentGroupMediaAccessIds: number[];
}

const initialGroup: Group = {
  id: 0,
  name: '',
  nameWithBadge: '',
  description: '',
  isSystem: false,
  memberCount: 0,
  status: 1,
  modifiedBy: '',
  modifiedOn: new Date()
}

@State<AdminGroupStateModel>({
  name: 'admin_groups',
  defaults: {
    groups: [],
    currentGroupId: null,
    currentGroup: initialGroup,
    currentGroupPermission: null,
    currentGroupmediaAccess: null,
    currentGroupmembers: [],
    currentGroupMediaAccessIds: []
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

  @Selector()
  static getRoleMediaAccessIds(state: AdminGroupStateModel) {
    // console.log(" AdminGroupState - currentGroupMediaAccessIds " + state.currentGroupMediaAccessIds);
    return state.currentGroupMediaAccessIds;
  }
  //#endregion

  constructor(private adminGroupService: AdminGroupsService,
    private adminMediaAccessService: AdminMediaAccessService,
    private dateService: DateService) { }

  //#region A C T I O N S

  @Action(GetGroups)
  getGroups(ctx: StateContext<AdminGroupStateModel>) {
    return this.adminGroupService.getGroups().pipe(tap(groups => {
      const state = ctx.getState();

      groups.map(group => {
        group.modifiedOnString = this.dateService.formatToString(group.modifiedOn);
      });

      ctx.setState({
        ...state,
        groups: groups,
      });
    }, (err) => {
      ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
    }));
  }

  @Action(GetGroup)
  getGroup(ctx: StateContext<AdminGroupStateModel>, { id }: GetGroup) {
    return this.adminGroupService.getGroup(id).pipe(tap(group => {
      const state = ctx.getState();
      ctx.setState({
        ...state,
        currentGroup: group ? group : null
      });
    }, (err) => {
      ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
    }));
  }

  @Action(ClearGroup)
  clearGroup({ getState, setState }: StateContext<AdminGroupStateModel>) {
    const state = getState();
    setState({
      ...state,
      currentGroup: initialGroup
    });
  }

  @Action(CreateGroup)
  createGroup(ctx: StateContext<AdminGroupStateModel>, { payload }: CreateGroup) {
    return this.adminGroupService.createGroup(payload).pipe(
      tap(group => {
        ctx.dispatch(new DisplayToastMessage('Group created successfully.'));
        const state = ctx.getState();
        ctx.setState({
          ...state,
          currentGroupId: group.id
        });
      }, (err) => {
        ctx.dispatch(new DisplayToastMessage(err.error, ToastType.error));
      })
    );
  }

  @Action(UpdateGroup)
  updateGroup(ctx: StateContext<AdminGroupStateModel>, { payload, id }: UpdateGroup) {
    return this.adminGroupService.updateGroup(id, payload).pipe(
      tap(group => {
        ctx.dispatch(new DisplayToastMessage('Group updated successfully.'));
      }, (err) => {
        ctx.dispatch(new DisplayToastMessage(err.error, ToastType.error));
      })
    );
  }

  @Action(DisableGroup)
  disableGroup(ctx: StateContext<AdminGroupStateModel>, { id, payload, refreshList }: DisableGroup) {
    //payload.status = 0;
    let newPayload = {...payload}
    newPayload.status = 0;
    ctx.dispatch(new DisplayToastMessage('Group was disabled successfully.'));
    return this.adminGroupService.updateGroup(id, newPayload).pipe(
      tap(group => {
        if (refreshList) {
          ctx.dispatch(new GetGroups());
        }
      }, (err) => {
        ctx.dispatch(new DisplayToastMessage(err.error, ToastType.error));
      })
    );
  }
  @Action(AssignToPermission)
  assignToPermission(ctx: StateContext<AdminGroupStateModel>, { groupid, payload }: AssignToPermission) {
    return this.adminGroupService.updatePermissions(groupid, payload).pipe(
      tap(group => {
        ctx.dispatch(new DisplayToastMessage('Group permission updated successfully.'));
        ctx.dispatch(new GetGroups());
      }, (err) => {
        ctx.dispatch(new DisplayToastMessage(err.error, ToastType.error));
      })
    );
  }
  @Action(EnableGroup)
  enableGroup(ctx: StateContext<AdminGroupStateModel>, { id, payload, refreshList }: EnableGroup) {
  //  payload.status = 1;
    let newPayload = {...payload}
    newPayload.status = 1;
    ctx.dispatch(new DisplayToastMessage('Group was enabled successfully.'));
    return this.adminGroupService.updateGroup(id, newPayload).pipe(
      tap(group => {
        if (refreshList) {
          ctx.dispatch(new GetGroups());
        }
      }, (err) => {
        ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
      })
    );
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
  getGroupMembers(ctx: StateContext<AdminGroupStateModel>, { groupId }: GetGroupMembers) {
    return this.adminGroupService.getGroupMembers(groupId).pipe(tap(users => {
      const state = ctx.getState();
      return ctx.setState({
        ...state,
        currentGroupmembers: users
      });
    }, (err) => {
      ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
    }));
  }

  @Action(GetGroupPermissions)
  getGroupPermissions(ctx: StateContext<AdminGroupStateModel>, { groupId }: GetGroupPermissions) {
    return this.adminGroupService.getGroupPermissions(groupId).pipe(tap(permissions => {
      const state = ctx.getState();

      return ctx.setState({
        ...state,
        currentGroupPermission: permissions
      });

    }, (err) => {
      ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
    }));
  }

  @Action(GetMediaAccess)
  getMediaAccess(ctx: StateContext<AdminGroupStateModel>) {
    return this.adminMediaAccessService.getMediaAccess().pipe(tap(mediaAccess => {
      const state = ctx.getState();
      ctx.setState({
        ...state,
        currentGroupmediaAccess: mediaAccess
      });
    }, (err) => {
      ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
    }));
  }

  @Action(UpdateGroupPermissions)
  updateGroupPermissions(ctx: StateContext<AdminGroupStateModel>, { groupId, payload }: UpdateGroupPermissions) {
    return this.adminGroupService.updateGroupPermissions(groupId, payload).pipe(tap(() => {
      ctx.dispatch(new GetGroupPermissions(groupId));
      ctx.dispatch(new DisplayToastMessage('Group permissions updated.'));
      console.log(payload,'this is the selected item')
    }, (err) => {
      ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
    }));
  }

  @Action(AddGroupMembers)
  addGroupMembers(ctx: StateContext<AdminGroupStateModel>, { groupId, payload }: AddGroupMembers) {
    return this.adminGroupService.addGroupMembers(groupId, payload).pipe(tap(response => {
      const state = ctx.getState();
      ctx.dispatch(new DisplayToastMessage(`Group members updated.`));
      var members = response as User[];
      ctx.setState({
        ...state,
        currentGroupmembers: members
      });
    }, (err) => {
      ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
    }));
  }

  @Action(RemoveGroupMembers)
  removeGroupMembers(ctx: StateContext<AdminGroupStateModel>, { groupId, payload }: RemoveGroupMembers) {
    return this.adminGroupService.removeGroupMembers(groupId, payload).pipe(
      tap(() => {
        ctx.dispatch(new DisplayToastMessage(`${payload.length} member(s) removed.`));
        ctx.dispatch(new GetGroupMembers(groupId));
      }, (err) => {
        ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
      }));
  }

  @Action(GetRoleMediaAccess)
  getRoleMediaAccessIds(ctx: StateContext<AdminGroupStateModel>, { groupId }: GetRoleMediaAccess) {
    return this.adminMediaAccessService.getMediaAccessIds(groupId).subscribe((mediaAccess) => {
      const state = ctx.getState();
      let roleMediaAccessIds: any[] = [];
      roleMediaAccessIds = mediaAccess.map(groupMediaAccess => groupMediaAccess.directoryId);
      console.log('groupMediaAccess', roleMediaAccessIds);
      ctx.setState({
        ...state,
        currentGroupMediaAccessIds: roleMediaAccessIds
      });
    }, (err) => {
      ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
    });
  }

  @Action(UpdateRoleMediaAccess)
  updateRoleMediaAccess(ctx: StateContext<AdminGroupStateModel>, { groupid, payload }: UpdateRoleMediaAccess) {
    ctx.dispatch(new DisplayToastMessage('Group media access updated.'));
    return this.adminMediaAccessService.updateMediaAccess(groupid, payload).pipe(tap(() => {
      console.log('updateRoleMediaAccess');
    }, (err) => {
      ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
    }));
  }
  //#endregion
}
