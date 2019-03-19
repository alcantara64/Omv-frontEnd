import { GridColumn } from './../../core/models/grid.column';
import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';

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

  constructor() {
    super();
  }

  ngOnInit() {
  }
}
