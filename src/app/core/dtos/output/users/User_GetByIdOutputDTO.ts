import { BaseDTO } from '../../BaseDTO';

export class User_GetByIdOutputDTO extends BaseDTO {
  UserId: number;
  UserName: string;
  EmailAddress: string;
  FirstName: string;
  LastName: string;
  DisplayName: string;
  RoleName: string;
  Status: number;
  StatusName: string;
}
