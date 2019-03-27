import { BaseDTO } from './../../BaseDTO';
export class Role_GetPermissionsByIdOutputDTO extends BaseDTO {
  RoleId: number;
  PermissionId: string;
  PermissionDescription: string;
}
