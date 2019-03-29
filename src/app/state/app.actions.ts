import { User } from 'src/app/core/models/entity/user';
export class ShowLeftNav {
  static readonly type = '[App] ShowLeftNav';

  constructor(public payload: boolean) { }
}

export class SetPageTitle {
  static readonly type = '[App] SetPageTitle';

  constructor(public payload: string) { }
}

export class SetLoggedInUser {
  static readonly type = '[App] SetLoggedInUser';

  constructor(public user: any) { }
}

export class GetLoggedInUser {
  static readonly type = '[App] GetLoggedInUser';

  constructor(public userId: number) { }
}

export class LogOut {
  static readonly type = '[App] LogOut';
}

export class GetUserPermissions {
  static readonly type = '[App] GetUserPermissions';

  constructor(public userId: number) { }
}