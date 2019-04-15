import { PaginationInfo } from '../../dtos/output/PaginationInfo';

export class Users {
  pagination: PaginationInfo;
  data: User[];
}

export class User {
  userId: number;
  userName: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  displayName: string
  roleNames: string;
  status: number;
  statusName?: string;
  createdOn?: Date;
  createdBy?: string;
  modifiedOn?: Date;
  modifiedOnString?: string;
  modifiedBy?: string;
}

export interface LoggedInUser{
  firstName: string;
  lastName: string;
  id: string;
  role: Array<UserRole>;
}

export enum UserRole {
  None = 0,
  Admin= 1
}
