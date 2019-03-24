export class Group {
  id: number;
  name: string;
  description: string;  
  modifiedOn: string;
  modifiedBy: string;
  permission: number[];
  groupId: number [];
  members: number[];
  directories: any[];
  status: number;
  isAssigned: boolean;
}