import { GridColumn } from './../../core/models/grid.column';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { GridComponent, RowSelectEventArgs, SelectionSettingsModel, RowDeselectEventArgs } from '@syncfusion/ej2-angular-grids';
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
    this.selectionOptions = { checkboxMode: 'ResetOnRowClick'};
  }

  performFirstAction() {
    this.firstAction.emit(this.selectedRecords);
  }

  performSecondAction() {
    this.secondAction.emit(this.selectedRecords);
  }

  performNavigation() {
    // let id = this.gridData[]
    // for (let i = 0; i < this.gridData.length; i++) {
    //   this.gridData[i].id = id;
    // }
    // this.navigate.emit();
   // this.router.navigate('/edit/groups')
  }

  rowSelected(args: RowSelectEventArgs) {    
    this.selectedRecords = this.grid.getSelectedRecords();
  }

  rowDeselected(args: RowDeselectEventArgs) {    
    this.selectedRecords = this.grid.getSelectedRecords();
  }
}
