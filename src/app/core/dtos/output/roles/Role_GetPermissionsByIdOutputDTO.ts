import { BaseDTO } from './../../BaseDTO';
export class Role_GetPermissionsByIdOutputDTO extends BaseDTO {
  roleId: number;
  permissionId: string;
  permissionDescription: string;
}
