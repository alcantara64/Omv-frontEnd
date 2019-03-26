export class ShowLeftNav {
  static readonly type = '[App] ShowLeftNav';

  constructor(public payload: boolean) { }
}

export class SetPageTitle {
  static readonly type = '[App] SetPageTitle';

  constructor(public payload: string) { }
}
