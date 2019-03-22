import { Component, OnInit } from '@angular/core';
import { GridColumn } from 'src/app/core/models/grid.column';

@Component({
  selector: 'app-admin-group-members',
  templateUrl: './admin-group-members.component.html',
  styleUrls: [ './admin-group-members.component.css', './../../../app.component.css' ]
})
export class AdminGroupMembersComponent implements OnInit {

  members: any[] = [];
  selectedmembers: any[] = [];

  columns: GridColumn[] = [
    {type: "checkbox", headerText: "Select All", width: "100", field: ""},
    {type: "", headerText: "Name", width: "", field: "name"},
    {type: "", headerText: "Email", width: "", field: "email"},
  ];

  constructor() { }

  ngOnInit() {
  }

}
