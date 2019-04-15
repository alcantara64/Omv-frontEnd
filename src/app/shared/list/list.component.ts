import { GridColumn } from './../../core/models/grid.column';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { GridComponent, RowSelectEventArgs, SelectionSettingsModel, RowDeselectEventArgs, CellSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { setSpinner, createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { Request_Status } from 'src/app/core/enum/request-status';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css', '../../app.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {

  selectedRecords = [];

  @Input() totalCountText: string;
  @Input() initialRecords = [];
  @Input() listData = [];
  @Input() columns: GridColumn[];
  @Input() isToolBarVisible: boolean; 
  @Input() showFirstAction: boolean; 
  @Input() showSecondAction: boolean;
  @Input() firstActionText: string;
  @Input() secondActionText: string;
  @Input() toolbarActionOne: string;
  @Input() toolbarActionTwo: string;
  @Input() buttonOneText: string;
  @Input() secondButtonText: string;
  @Input() checkField: string;
  @Input() showFavoriteIcon: boolean;
  @Input() favoriteIconPosition: number = 1;
  @Input() showStatusIcon: boolean;
  @Input() statusIconPosition: number = 0;
  @Input() requestStatusEnum = Request_Status;
  @Input() selectedItemRecords = [];

  @Output() firstAction = new EventEmitter<Object[]>();
  @Output() secondAction = new EventEmitter<Object[]>();
  @Output() firstNavigateAction = new EventEmitter<any>();
  @Output() secondNavigateAction = new EventEmitter<any>();
  @Output() buttonOneEvent = new EventEmitter<Object[]>();
  @Output() secondButtonEvent = new EventEmitter<any[]>();
  @Output() toggleFavorite = new EventEmitter<any[]>();
  @Output () selectedItemData =  new EventEmitter<any>();

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

  performFirstToolbarAction() {
    this.firstAction.emit(this.selectedRecords);
  }

  performSecondToolbarAction() {
    this.secondAction.emit(this.selectedRecords);
  }

  performFirstAction(args: any) {
    let data = this.grid.getRowInfo(args.target);

    let rowData = data.rowData as any;
    this.firstNavigateAction.emit(rowData);
  }

  performSecondAction(args: any) {
    let data = this.grid.getRowInfo(args.target);

    let rowData = data.rowData as any;
    this.secondNavigateAction.emit(rowData);
  }

  rowSelected(args: RowSelectEventArgs) {
    this.selectedRecords = this.grid.getSelectedRecords();
    this.selectedItemRecords  = this.grid.getSelectedRecords();
    console.log('args - rowSelected', args.data['id']);
    const isSelected = this.selectedRecords.filter(x => x.id === args.data['id']);
    if (this.selectedItemRecords.length > 0) {
      this.selectedItemRecords.push(args.data);
      this.selectedItemData.emit(this.selectedItemRecords);
    } else if(this.selectedItemRecords.length > 1 && this.selectedItemRecords.includes(isSelected)) {
      this.selectedItemRecords.splice( this.selectedItemRecords.indexOf(args.data), 1 );
    }
    else{
      this.selectedItemData.emit(this.selectedItemRecords);
    }
  }

  rowDeselected(args: RowDeselectEventArgs) {
    this.selectedRecords = this.grid.getSelectedRecords();
  }

  rowDataBound(args) {
    if (this.initialRecords) {
      if (this.initialRecords.includes(args.data[this.checkField])) {
        this.selIndex.push(parseInt(args.row.getAttribute('aria-rowindex')));
      }
    }
  }

  dataBound(args): void {
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

  ngDoCheck(){
    //console.log("ListComponent - ngDoCheck");
  }

  ngOnChanges(){
    console.log("ListComponent - ngOnChanges");
    this.ShowSpinner(false);
  }

  performToggleFavorite(data: any) {
    data.isFavorite = !data.isFavorite;
    this.toggleFavorite.emit(data);
  }
}
