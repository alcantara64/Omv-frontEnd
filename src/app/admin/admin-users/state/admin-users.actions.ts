import { Action } from "@ngrx/store";
import { User } from 'src/app/core/models/User';

export enum UserActionTypes {
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
  readonly type = UserActionTypes.LoadActiveUsers;
}

export class LoadActiveUsersSuccess implements Action {
  readonly type = UserActionTypes.LoadActiveUsersSuccess;

  constructor(public payload: User[]) { }
}

export class LoadActiveUsersFail implements Action {
  readonly type = UserActionTypes.LoadActiveUsersFail;

  constructor(public payload: string) { }
}

export class LoadUnassignedUsers implements Action {
  readonly type = UserActionTypes.LoadUnassignedUsers;
}

export class LoadUnassignedUsersSuccess implements Action {
  readonly type = UserActionTypes.LoadUnassignedUsersSuccess;

  constructor(public payload: User[]) { }
}

export class LoadUnassignedUsersFail implements Action {
  readonly type = UserActionTypes.LoadUnassignedUsersFail;

  constructor(public payload: string) { }
}

export class LoadDisabledUsers implements Action {
  readonly type = UserActionTypes.LoadDisabledUsers;
}

export class LoadDisabledUsersSuccess implements Action {
  readonly type = UserActionTypes.LoadDisabledUsersSuccess;

  constructor(public payload: User[]) { }
}

export class LoadDisabledUsersFail implements Action {
  readonly type = UserActionTypes.LoadDisabledUsersFail;

  constructor(public payload: string) { }
}

export type UserActions = LoadActiveUsers
  | LoadActiveUsersSuccess
  | LoadActiveUsersFail
  | LoadUnassignedUsers
  | LoadUnassignedUsersSuccess
  | LoadUnassignedUsersFail
  | LoadDisabledUsers
  | LoadDisabledUsersSuccess
  | LoadDisabledUsersFail;