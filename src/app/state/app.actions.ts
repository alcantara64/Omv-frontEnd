import { User } from 'src/app/core/models/entity/user';
import { ToastType } from '../core/enum/toast';
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

export class ShowSpinner {
  static readonly type = '[App] ShowSpinner';
}

export class HideSpinner {
  static readonly type = '[App] HideSpinner';
}

export class GetAzureUploadConfiguration {
  static readonly type = '[App] GetAzureUploadConfiguration';
}

export class GetLoggedInUser {
  static readonly type = '[App] GetLoggedInUser';
}

export class RemoveLoggedInUser {
  static readonly type = '[App] RemoveLoggedInUser';
}

export class AuthenticateUser {
  static readonly type = '[App] AuthenticateUser';
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

export class DisplayToastMessage {
  static readonly type = '[App] DisplayToastMessage';

  constructor(public message: string, public type: ToastType = ToastType.success) {}
}

export class DeviceWidth {
  static readonly type = '[App] DeviceWidth';

  constructor(public deviceWidth: number) {}
}
