import { BaseDTO } from './../../BaseDTO';
export class Role_GetDirectoriesByIdOutputDTO extends BaseDTO {
  
  DirectoryId: number;
  DirectoryName: string;
  DirectoryParentId: number;
  HasChild: boolean;
  
}
