import { Component, OnInit } from '@angular/core';
import { GridColumn } from 'src/app/core/models/grid.column';

@Component({
  selector: 'app-admin-metadata-list-items',
  templateUrl: './admin-metadata-list-items.component.html',
  styleUrls: ['./admin-metadata-list-items.component.css']
})
export class AdminMetadataListItemsComponent implements OnInit {

  constructor() { }
  columns: GridColumn[] = [
    { type: "checkbox", headerText: "Select All", width: "100", field: "" },
    { type: "", headerText: "Name", width: "", field: "displayName" },
    
  ];
  ngOnInit() {
  }

}
