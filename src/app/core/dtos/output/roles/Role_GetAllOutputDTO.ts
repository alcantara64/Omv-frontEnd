import { BaseDTO } from "../../BaseDTO";

export class Role_GetAllOutputDTO extends BaseDTO {
  RoleId: number;
  RoleName: string;
  IsSystem: boolean;
  Status: number;
}
