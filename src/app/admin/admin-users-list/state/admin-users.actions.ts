import { User } from 'src/app/core/models/User';
import { userType } from 'src/app/core/enum/permission';

export class GetUsers {
  static readonly type = '[Admin Users Page] GetUsers';
}

export class GetUser {
  static readonly type = '[Admin Users Page] GetUser';

  constructor(public id: number) { }
}

export class UpdateUser {
  static readonly type = '[Admin Users Page] UpdateUser';

  constructor(public id: number, public payload: User) { }
}

export class DeleteUser {
  static readonly type = '[Admin Users Page] DeleteUser';

  constructor(public id: number, public payload: User) { }
}

export class DisableUser {
  static readonly type = '[Admin Users Page] DisableUser';

  constructor(public id: number, public payload: User) { }
}

export class EnableUser {
  static readonly type = '[Admin Users Page] EnableUser';

  constructor(public id: number, public payload: User) { }
}

export class AssignToGroups {
  static readonly type = '[Admin Users Page] AssignToGroups';

  constructor(public userid: number, public payload: number[]) { }
}

export class SetCurrentUserId {
  static readonly type = '[Admin Users Page] SetCurrentUserId';

  constructor(public id: number) { }
}

export class SetSelectedUserIds {
  static readonly type = '[Admin Users Page] SetSelectedUsers';

  constructor(public id: number[]) { }
}

export class SearchUsers {
  static readonly type = '[Admin Users Page] SearchUsers';

  constructor(public name: string, public groupid: number) { }
}
