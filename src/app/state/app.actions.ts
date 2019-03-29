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
