import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { GridColumn } from 'src/app/core/models/grid.column';

@Component({
  selector: 'app-tree-grid',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit {

  @Input() showFavoriteIcon: boolean;
  @Input() columns: GridColumn[];
  @Input() data: any;
  @Input() firstActionText: string;
  @Input() parentID: any;
  @Input() id: any;

  @Output() firstAction = new EventEmitter<Object[]>();
  constructor() { }

  ngOnInit() {
  }

}
