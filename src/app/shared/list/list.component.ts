import { GridColumn } from './../../core/models/grid.column';
import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { GridComponent, RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {

  @Input()
  listData: any[];

  @Input()
  columns: GridColumn[];
  @ViewChild('grid')
  public grid: GridComponent;
  constructor() {
    super();
  }

  ngOnInit() {
  }
  rowSelected(args: RowSelectEventArgs) {
    // let selectedrowindex: number[] = this.grid.getSelectedRowIndexes();  // Get the selected row indexes.
   // alert(selectedrowindex); // To alert the selected row indexes.
    let selectedrecords: Object[] = this.grid.getSelectedRecords();  // Get the selected records.
    console.log(selectedrecords);
}
}
