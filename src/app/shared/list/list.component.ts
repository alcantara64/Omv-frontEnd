import { GridColumn } from './../../core/models/grid.column';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { GridComponent, RowSelectEventArgs, SelectionSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {

  selectedRecords: any[];

  @Input()
  listData: any[];

  @Input()
  columns: GridColumn[];

  @Input()
  actionButtonText: string = 'Disable';

  @Output()
  action = new EventEmitter<Object[]>();
  
  @ViewChild('grid')
  public grid: GridComponent;

  public selectionOptions: SelectionSettingsModel;

  constructor() {
    super();
  }

  ngOnInit() {
    
  }

  performAction() {
    this.action.emit(this.selectedRecords);
  }

  rowSelected(args: RowSelectEventArgs) {
    // let selectedrowindex: number[] = this.grid.getSelectedRowIndexes();  // Get the selected row indexes.
   // alert(selectedrowindex); // To alert the selected row indexes.
    let _selectedRecords: Object[] = this.grid.getSelectedRecords();  // Get the selected records.
    this.selectedRecords = _selectedRecords;
    console.log(this.selectedRecords);
  }
}
