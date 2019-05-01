import { ListItem } from './list-item';

export class FilterMetadata {
  name: string;
  type: string;
  label: string;
  listName: string;
  isRequired: boolean;
  order: number;
  status: number;
  options: ListItem[];
}