import { Group } from './../../../core/models/group';

export class GetGroups {
  static readonly type = '[Admin Groups Page] GetGroups';
}

export class UpdateGroup {
  static readonly type = '[Admin Groups Page] UpdateGroup';

  constructor(public id: number, public payload: Group) { }
}

export class DisableGroup {
  static readonly type = '[Admin Groups Page] DisableGroup';

  constructor(public id: number, public payload: Group) { }
}

export class EnableGroup {
  static readonly type = '[Admin Groups Page] EnableGroup';

  constructor(public id: number, public payload: Group) { }
}

export class SetCurrentGroup {
  static readonly type = '[Admin Groups Page] SetCurrentGroup';

  constructor(public payload: Group) { }
}
