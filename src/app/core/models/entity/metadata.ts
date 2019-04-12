import { ListItem } from './list-item';

export class Metadata {
  fieldId: number;
  fieldName: string;
  listId: number;
  listName: string;
  fieldTypeId: number;
  fieldTypeName: string;
  entityId: string;
  entityName: string;
  isRequired: boolean;
  order: number;
  status: number;
  options: ListItem[];
}