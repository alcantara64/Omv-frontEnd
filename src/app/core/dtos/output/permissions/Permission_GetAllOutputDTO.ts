import { BaseDTO } from '../../BaseDTO';
export class Permission_GetAllOutputDTO extends BaseDTO {
  PermissionId: string;
  PermissionDescription: string;
  Status: number;
}
