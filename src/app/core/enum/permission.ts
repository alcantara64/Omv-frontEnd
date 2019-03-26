export enum permission {
  VIEW_USERS = 'VIEW_USERS',
  VIEW_GROUP = 'VIEW_GROUP'
}

export enum userType
{
  active =1,
  unassigned = 2,
  disabled = 3
}

export class Permission {
  id: number;
  name: string;
}