import { Component, OnInit, Input } from '@angular/core';
import { GridColumn } from 'src/app/core/models/grid.column';

@Component({
  selector: 'app-tree-grid',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit {

  @Input()
  columns: GridColumn[];

  @Input()
  data: any;
  constructor() { }

  ngOnInit() {
  }

}
