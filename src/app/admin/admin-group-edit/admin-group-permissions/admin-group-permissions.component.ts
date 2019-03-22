import { Component, OnInit } from '@angular/core';
import { GridColumn } from 'src/app/core/models/grid.column';

@Component({
  selector: 'app-admin-group-permissions',
  templateUrl: './admin-group-permissions.component.html',
  styleUrls: ['./admin-group-permissions.component.css']
})
export class AdminGroupPermissionsComponent implements OnInit {

  permissions: any[] = [];
  selectedPermission: any[] = [];

  columns: GridColumn[] = [
    {type: "checkbox", headerText: "Select All", width: "100", field: ""},
    {type: "", headerText: "Permission Title", width: "", field: "title"}
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
