export enum permission {
  VIEW_USERS = 'VIEW_USERS',
  VIEW_USERS_EDIT = 'VIEW_USERS_EDIT',
  VIEW_GROUP = 'VIEW_GROUP',
  VIEW_GROUP_EDIT = 'VIEW_GROUP_EDIT',
  VIEW_ADMIN_DASHBOARD = 'VIEW_ADMIN_DASHBOARD',  
}

export enum userType
{
  active =1,
  unassigned = 2,
  disabled = 3
}

export class Permission {
  id: string;
  name: string;
  status: number;
}