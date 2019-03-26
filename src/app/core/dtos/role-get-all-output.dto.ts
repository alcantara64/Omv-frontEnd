import { BaseDTO } from './base.dto';

export class Role_GetAllOutputDTO extends BaseDTO {
  roleId: number;
  roleName: string;
  isSystem: boolean;
  status: number;
}