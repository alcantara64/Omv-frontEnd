export class GridColumn {
  type?: string;
  headerText: string;
  field: string;
  width?: string;
  textAlign?: string = 'right';
  format?: string;
  showCheckbox? : boolean;
}