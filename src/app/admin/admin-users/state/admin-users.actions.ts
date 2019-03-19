import { Action } from "@ngrx/store";
import { User } from 'src/app/core/models/User';

export enum AdminUserActionTypes {
  LoadActiveUsers = '[Admin Users] Load Active Users',
  LoadActiveUsersSuccess = '[Admin Users] Load Active Users Success',
  LoadActiveUsersFail = '[Admin Users] Load Active Users Fail',

  LoadUnassignedUsers = '[Admin Users] Load Unassigned Users',
  LoadUnassignedUsersSuccess = '[Admin Users] Load Unassigned Users Success',
  LoadUnassignedUsersFail = '[Admin Users] Load Unassigned Users Fail',

  LoadDisabledUsers = '[Admin Users] Load Disabled Users',
  LoadDisabledUsersSuccess = '[Admin Users] Load Disabled Users Success',
  LoadDisabledUsersFail = '[Admin Users] Load Disabled Users Fail',
}

export class LoadActiveUsers implements Action {
  readonly type = AdminUserActionTypes.LoadActiveUsers;
}

export class LoadActiveUsersSuccess implements Action {
  readonly type = AdminUserActionTypes.LoadActiveUsersSuccess;

  constructor(public payload: User[]) { }
}

export class LoadActiveUsersFail implements Action {
  readonly type = AdminUserActionTypes.LoadActiveUsersFail;

  constructor(public payload: string) { }
}

export class LoadUnassignedUsers implements Action {
  readonly type = AdminUserActionTypes.LoadUnassignedUsers;
}

export class LoadUnassignedUsersSuccess implements Action {
  readonly type = AdminUserActionTypes.LoadUnassignedUsersSuccess;

  constructor(public payload: User[]) { }
}

export class LoadUnassignedUsersFail implements Action {
  readonly type = AdminUserActionTypes.LoadUnassignedUsersFail;

  constructor(public payload: string) { }
}

export class LoadDisabledUsers implements Action {
  readonly type = AdminUserActionTypes.LoadDisabledUsers;
}

export class LoadDisabledUsersSuccess implements Action {
  readonly type = AdminUserActionTypes.LoadDisabledUsersSuccess;

  constructor(public payload: User[]) { }
}

export class LoadDisabledUsersFail implements Action {
  readonly type = AdminUserActionTypes.LoadDisabledUsersFail;

  constructor(public payload: string) { }
}

export type AdminUserActions = LoadActiveUsers
  | LoadActiveUsersSuccess
  | LoadActiveUsersFail
  | LoadUnassignedUsers
  | LoadUnassignedUsersSuccess
  | LoadUnassignedUsersFail
  | LoadDisabledUsers
  | LoadDisabledUsersSuccess
  | LoadDisabledUsersFail;