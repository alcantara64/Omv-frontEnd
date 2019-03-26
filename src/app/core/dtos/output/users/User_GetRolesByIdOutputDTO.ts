import { BaseDTO } from '../../BaseDTO';

export class User_GetRolesByIdOutputDTO extends BaseDTO {
  UserId: number;
  RoleId: number;
  RoleName: string;
}
