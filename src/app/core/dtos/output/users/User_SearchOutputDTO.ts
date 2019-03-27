import { BaseDTO } from '../../BaseDTO';

export class User_SearchOutputDTO extends BaseDTO  {
  UserId: number;
  UserName: string;
  EmailAddress: string;
  FirstName: string;
  LastName: string;
  DisplayName: string;
  RoleNames: string;
  Status: number;
  StatusName: string;
}
