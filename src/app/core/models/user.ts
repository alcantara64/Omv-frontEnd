export interface User {
  id:number
  name: string;
  description: string;
  email: string;
  modifiedBy: string;
  groups: string;
  status: number;
  isAssigned: boolean;
}