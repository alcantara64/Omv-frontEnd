import { Group } from './../../../core/models/group';

export class GetGroups {
  static readonly type = '[Admin Groups] GetGroups';
}

export class GetGroup {
  static readonly type = '[Admin Groups] GetGroup';
  
  constructor(public id: number) { }
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

  constructor(public id: number, public payload: Group) { }
}

export class EnableGroup {
  static readonly type = '[Admin Groups] EnableGroup';

  constructor(public id: number, public payload: Group) { }
}

export class SetCurrentGroup {
  static readonly type = '[Admin Groups] SetCurrentGroup';

  constructor(public payload: Group) { }
}

export class AssignToPermission {
  static readonly type = '[Admin Groups] AssignToPermission';

  constructor(public groupid: number, public payload: number[]) { }
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
  static readonly type = '[Admin Users Page] GetMembers';

}

export class GetPermissionsByGroupId{
  static readonly type = '[Admin Users Edit Page] GetPermissionsByGroupId';

  constructor(public groupId: number) { }

}
export class GetMembersByGroupId{
  static readonly type = '[Admin Users Edit Page] GetMembersByGroupId';

  constructor(public groupId: number) { }

}
export class GetMediaAccess {
  static readonly type = '[Admin Users Page] GetMediaAccess';

}