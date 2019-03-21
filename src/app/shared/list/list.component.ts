import { GridColumn } from './../../core/models/grid.column';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { GridComponent, RowSelectEventArgs, SelectionSettingsModel, RowDeselectEventArgs, CellSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {

  selectedRecords = [];

  @Input()
  listData = [];

  @Input()
  columns: GridColumn[];

  @Input()
  isToolBarVisible: boolean;

  @Input()
  firstActionButtonText: string;

  @Input()
  secondActionButtonText: string;

  @Output()
  firstAction = new EventEmitter<Object[]>();

  @Output()
  secondAction = new EventEmitter<Object[]>();

  @Output()
  navigate = new EventEmitter<string>();
  

  @ViewChild('grid')
  public grid: GridComponent;
  gridData: any[];
  public selectionOptions: SelectionSettingsModel;

  constructor() {
    super();
  }

  ngOnInit() {
    this.selectionOptions = { checkboxOnly : true, persistSelection: true};
  }

  cellSelected(args: CellSelectEventArgs) {
    let selectedrecords: Object[] = this.grid.getSelectedRecords();
    // Get the selected records.
    this.gridData = selectedrecords;
    console.log(selectedrecords);
    
  }

  performSecondAction() {
    this.secondAction.emit(this.selectedRecords);
  }

  performNavigation(args: any) {
    let data= this.grid.getRowInfo(args.target);
 
    let rowdata = data.rowData as any;
 
    console.log(rowdata.id);
  }

  navigateToEditScreen() {
    let id: string;
    for (let i = 0; i < this.gridData.length; i++) {
    this.gridData[i].id = id;
    }
   // this.router.navigate('/edit/groups')
  }

  rowSelected(args: RowSelectEventArgs) {    
    this.selectedRecords = this.grid.getSelectedRecords();
  }

  rowDeselected(args: RowDeselectEventArgs) {    
    this.selectedRecords = this.grid.getSelectedRecords();
  }
}
