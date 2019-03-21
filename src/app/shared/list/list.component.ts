import { GridColumn } from './../../core/models/grid.column';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { GridComponent, RowSelectEventArgs, SelectionSettingsModel, RowDeselectEventArgs } from '@syncfusion/ej2-angular-grids';

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
  
  @ViewChild('grid')
  public grid: GridComponent;

  public selectionOptions: SelectionSettingsModel;

  constructor() {
    super();
  }

  ngOnInit() {
    
  }

  performFirstAction() {
    this.firstAction.emit(this.selectedRecords);
  }

  performSecondAction() {
    this.secondAction.emit(this.selectedRecords);
  }

  rowSelected(args: RowSelectEventArgs) {    
    this.selectedRecords = this.grid.getSelectedRecords();
  }

  rowDeselected(args: RowDeselectEventArgs) {    
    this.selectedRecords = this.grid.getSelectedRecords();
  }
}
