import { User_SearchInputDTO } from '../../../core/dtos/input/users/User_SearchInputDTO';
import { User } from 'src/app/core/models/entity/user';

export class GetUsers {
  static readonly type = '[Admin Users] GetUsers';

  constructor(public name?: string, public groupId? : number) { }
}

export class GetUser {
  static readonly type = '[Admin Users] GetUser';

  constructor(public id: number) { }
}

export class ClearUser {
  static readonly type = '[Admin Users] ClearUser';
}

export class CreateUser {
  static readonly type = '[Admin Users] CreateUser';

  constructor(public payload: User) { }
}

export class UpdateUser {
  static readonly type = '[Admin Users] UpdateUser';

  constructor(public id: number, public payload: User) { }
}

export class DeleteUser {
  static readonly type = '[Admin Users] DeleteUser';

  constructor(public id: number, public payload: User) { }
}

export class DisableUser {
  static readonly type = '[Admin Users] DisableUser';

  constructor(public id: number, public payload: User) { }
}

export class EnableUser {
  static readonly type = '[Admin Users] EnableUser';

  constructor(public id: number, public payload: User) { }
}

export class GetUserGroups {
  static readonly type = '[Admin Users] GetUserGroups';

  constructor(public userId: number) { }
}

export class ClearUserGroups {
  static readonly type = '[Admin Users] ClearUserGroups';
}

export class UpdateUserGroups {
  static readonly type = '[Admin Users] UpdateUserGroups';

  constructor(public userid: number, public payload: number[], public isAddRoles?: boolean) { }
}

export class SetCurrentUserId {
  static readonly type = '[Admin Users] SetCurrentUserId';

  constructor(public id: number) { }
}

export class SetSelectedUserIds {
  static readonly type = '[Admin Users] SetSelectedUsers';

  constructor(public id: number[]) { }
}

export class SearchUsers {
  static readonly type = '[Admin Users] SearchUsers';

  constructor(public name: string, public groupid: number) { }
}