import { BaseDTO } from '../../BaseDTO';
import { PaginationInfo } from '../PaginationInfo';

export class User_SearchOutputDTO {
  Pagination: PaginationInfo;
  Data: User_SearchOutputDTOData[];
}

export class User_SearchOutputDTOData extends BaseDTO  {
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
