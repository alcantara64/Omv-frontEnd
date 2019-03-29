import { BaseDTO } from './../../BaseDTO';
export class Role_GetDirectoriesByIdOutputDTO extends BaseDTO {
  
  directoryId: number;
  directoryName: string;
  directoryParentId: number;
  hasChild: boolean;
  
}
