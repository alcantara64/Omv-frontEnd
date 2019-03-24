import { GridColumn } from './../../core/models/grid.column';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { GridComponent, RowSelectEventArgs, SelectionSettingsModel, RowDeselectEventArgs, CellSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {

  @Input()
  initialRecords = [];


  selectedRecords = [];

  @Input()
  listData = [];

  @Input()
  columns: GridColumn[];

  @Input()
  isToolBarVisible: boolean;

  @Input()
  shouldEdit: boolean;

  @Input()
  firstActionButtonText: string;

  @Input()
  secondActionButtonText: string;

  @Input()
  buttonOneText: string;

  @Output()
  firstAction = new EventEmitter<Object[]>();

  @Output()
  secondAction = new EventEmitter<Object[]>();

  @Output()
  navigate = new EventEmitter<string>();

  @Output()
  buttonOneEvent = new EventEmitter<Object[]>();



  public selIndex: any[] = [];


  @ViewChild('grid')
  public grid: GridComponent;
  gridData: any[];
  public selectionOptions: SelectionSettingsModel;

  constructor(protected store: Store) {
    super(store);
  }

  ngOnInit() {
    this.selectionOptions = { checkboxOnly: true, persistSelection: true };
    //this.grid.selectedRowIndex = 1;
    //this.grid.selectedRowIndex = 2;
    //this.grid.selectedRowIndex = 3;
    if (!this.initialRecords) {
      return;
    }
    this.initialRecords.forEach(record => {
      this.grid.selectRow(1, true);
    });

  }


  performFirstAction() {
    this.firstAction.emit(this.selectedRecords);


  }

  performSecondAction() {
    this.secondAction.emit(this.selectedRecords);
  }

  performNavigation(args: any) {
    let data = this.grid.getRowInfo(args.target);

    let rowdata = data.rowData as any;

    console.log(rowdata.id);
    this.navigate.emit(rowdata.id);
  }

  navigateToEditScreen() {
    let id: string;
    for (let i = 0; i < this.gridData.length; i++) {
      this.gridData[i].id = id;
    }

  }

  rowSelected(args: RowSelectEventArgs) {
    this.selectedRecords = this.grid.getSelectedRecords();
    console.log(this.selectedRecords);
  }

  rowDeselected(args: RowDeselectEventArgs) {
    this.selectedRecords = this.grid.getSelectedRecords();


  }

  rowDataBound(args) {
    //console.log("ListComponent - rowDataBound");

  
    if (this.initialRecords.includes(args.data["id"])) {
      this.selIndex.push(parseInt(args.row.getAttribute('aria-rowindex')));

    }
    else{
      return;
    }
  }

  public dataBound(args): void {
    if (this.selIndex.length) {
      this.grid.selectRows(this.selIndex);
      this.selIndex = [];
    }
    this.selectedRecords = this.grid.getSelectedRecords();
    console.log("selectedRecords " + this.selectedRecords);
  }


  buttonone() {
    this.buttonOneEvent.emit(this.selectedRecords);
  }
}
