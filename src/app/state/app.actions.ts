export class ShowLeftNav {
  static readonly type = '[App] ShowLeftNav';

  constructor(public payload: boolean) { }
}

export class SetPageTitle {
  static readonly type = '[App] SetPageTitle';

  constructor(public payload: string) { }
}

export class ClearNotification {
  static readonly type = '[Notification] ClearNotification';
}

export enum messageType {
  success = "success",
  warning = "warning",
  error = "error",
}

export class SetNotification {

  static readonly type = '[Notification] SetNotification';

  constructor(public message: string | null, public messageType? : messageType) { }
}
