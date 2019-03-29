import { User } from 'src/app/core/models/entity/user';
export class ShowLeftNav {
  static readonly type = '[App] ShowLeftNav';

  constructor(public payload: boolean) { }
}

export enum messageType {
  success = "success",
  warning = "warning",
  error = "error",
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

export class ClearNotification {
  static readonly type = '[Notification] ClearNotification';
}

export class SetNotification {

  static readonly type = '[Notification] SetNotification';

  constructor(public message: string | null, public messageType? : messageType) { }
}

export class Confirmation {
  static readonly type = '[Confirmation] Confirmation';
}

export class ClearConfirmation {
  static readonly type = '[ClearConfirmation] Confirmation';
}

export class ShowConfirmationBox {
  static readonly type = '[ShowConfirmationBox] showConfirmationBox';

  constructor(public show: boolean ) {}
}
