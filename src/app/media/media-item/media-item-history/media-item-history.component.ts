import { Component, OnInit } from '@angular/core';
import { GridColumn } from 'src/app/core/models/grid.column';

@Component({
  selector: 'app-media-item-history',
  templateUrl: './media-item-history.component.html',
  styleUrls: ['./media-item-history.component.css']
})
export class MediaItemHistoryComponent implements OnInit {
  columns: GridColumn[] = [
    { type: '', headerText: 'Field Title', width: '', field: 'displayName' },
    { type: '', headerText: 'Action Taken', width: '', field: 'emailAddress' },
    { type: '', headerText: 'Updated By', width: '', field: 'modifiedBy' },
    { type: '', headerText: 'Old Value', width: '150', field: 'roleNames' },
    { type: '', headerText: 'New Value', width: '', field: 'modifiedBy' },
    { type: '', headerText: 'Date', width: '150', field: 'roleNames' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
