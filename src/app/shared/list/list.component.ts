import { GridColumn } from './../../core/models/grid.column';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { GridComponent, RowSelectEventArgs, SelectionSettingsModel } from '@syncfusion/ej2-angular-grids';
import { Router } from '@angular/router';

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
  gridData: any[];
  public selectionOptions: SelectionSettingsModel;

  constructor() {
    super();
  }

  ngOnInit() {
    this.selectionOptions = { checkboxMode: 'ResetOnRowClick'};
  }

  rowSelected(args: RowSelectEventArgs) {
    let selectedrecords: Object[] = this.grid.getSelectedRecords();
    // Get the selected records.
    this.gridData = selectedrecords;
    console.log(selectedrecords);
    
  }

  performAction() {
    this.action.emit(this.selectedRecords);
  }

  navigateToEditScreen() {
    let id: string;
    for (let i = 0; i < this.gridData.length; i++) {
    this.gridData[i].id = id;
    }
   // this.router.navigate('/edit/groups')
  }
}
