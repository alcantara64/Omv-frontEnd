import { GridColumn } from './../../core/models/grid.column';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { GridComponent, RowSelectEventArgs, SelectionSettingsModel, RowDeselectEventArgs, CellSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { setSpinner, createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css', '../../app.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {

  selectedRecords = [];

  @Input()
  initialRecords = [];

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

  @Input()
  secondButtonText: string;

  @Input()
  checkField: string;

  @Output()
  firstAction = new EventEmitter<Object[]>();

  @Output()
  secondAction = new EventEmitter<Object[]>();

  @Output()
  navigate = new EventEmitter<any>();

  @Output()
  buttonOneEvent = new EventEmitter<Object[]>();

  @Output()
  secondButtonEvent = new EventEmitter<any[]>();

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
    console.log('ListComponent - ngOnInit');
  }

  gridCreated(): void {
    console.log('ListComponent - gridCreated');
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
    this.navigate.emit(rowdata);
  }

  rowSelected(args: RowSelectEventArgs) {
    this.selectedRecords = this.grid.getSelectedRecords();
    console.log(this.selectedRecords);
  }

  rowDeselected(args: RowDeselectEventArgs) {
    this.selectedRecords = this.grid.getSelectedRecords();
  }

  rowDataBound(args) {
    console.log('ListComponent - rowDataBound');
    if (!this.initialRecords) return;


    if (this.initialRecords.includes(args.data[this.checkField])) {
      this.selIndex.push(parseInt(args.row.getAttribute('aria-rowindex')));
    }

  }

  dataBound(args): void {
    console.log('ListComponent - dataBound');

    if (this.selIndex.length) {
      this.grid.selectRows(this.selIndex);
      this.selIndex = [];
    }
    this.selectedRecords = this.grid.getSelectedRecords();
  }

  buttonone() {
    this.buttonOneEvent.emit(this.selectedRecords);
  }

  performSecondButtonEvent() {
    this.secondButtonEvent.emit(this.selectedRecords);
  }
}
