import { Group } from '../../../core/models/entity/group';

export class GetGroups {
  static readonly type = '[Admin Groups] GetGroups';
}

export class GetGroup {
  static readonly type = '[Admin Groups] GetGroup';

  constructor(public id: number) { }
}

export class ClearGroup {
  static readonly type = '[Admin Groups] ClearGroup';
}

export class CreateGroup {
  static readonly type = '[Admin Groups] CreateGroup';

  constructor(public payload: Group) { }
}

export class UpdateGroup {
  static readonly type = '[Admin Groups] UpdateGroup';

  constructor(public id: number, public payload: Group) { }
}

export class DisableGroup {
  static readonly type = '[Admin Groups] DisableGroup';

  constructor(public id: number, public payload: Group, public refreshList?: boolean) { }
}

export class EnableGroup {
  static readonly type = '[Admin Groups] EnableGroup';

  constructor(public id: number, public payload: Group, public refreshList?: boolean) { }
}

export class SetCurrentGroup {
  static readonly type = '[Admin Groups] SetCurrentGroup';

  constructor(public payload: Group) { }
}

export class AssignToPermission {
  static readonly type = '[Admin Groups] AssignToPermission';

  constructor(public groupid: number, public payload: any) { }
}

export class SetCurrentGroupId {
  static readonly type = '[Admin Groups] SetCurrentGroupId';

  constructor(public id: number) { }
}

export class SetSelectedGroupIds {
  static readonly type = '[Admin Groups] SetSelectedGroupIds';

  constructor(public id: number[]) { }
}

export class GetMembers {
  static readonly type = '[Admin Groups] GetMembers';
}

export class ClearMembers {
  static readonly type = '[Admin Groups] ClearMembers';
}

export class GetGroupPermissions {
  static readonly type = '[Admin Groups] GetGroupPermissions';

  constructor(public groupId: number) { }
}

export class UpdateGroupPermissions {
  static readonly type = '[Admin Groups] UpdateGroupPermissions';

  constructor(public groupId: number, public payload: string[]) { }
}

export class GetGroupMembers {
  static readonly type = '[Admin Groups] GetGroupMembers';

  constructor(public groupId: number) { }
}

export class AddGroupMembers {
  static readonly type = '[Admin Groups] AddGroupMembers';

  constructor(public groupId: number, public payload: number[]) { }
}

export class RemoveGroupMembers {
  static readonly type = '[Admin Groups] RemoveGroupMembers';

  constructor(public groupId: number, public payload: number[]) { }
}
export class GetMediaAccess {
  static readonly type = '[Admin Groups Page] GetMediaAccess';

}
export class GetRoleMediaAccess {
  static readonly type = '[Admin Groups] GetRoleMediaAccess';

  constructor(public groupId: number) { }
}
export class UpdateRoleMediaAccess {
  static readonly type = '[Admin Groups] UpdateRoleMediaAccess';

  constructor(public groupid: number, public payload: number[]) {

  }
}