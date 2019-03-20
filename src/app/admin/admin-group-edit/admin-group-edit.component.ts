import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-group-edit',
  templateUrl: './admin-group-edit.component.html',
  styleUrls: ['./admin-group-edit.component.css']
})
export class AdminGroupEditComponent implements OnInit {
  public headerText: Object = [{ text: 'Permissions' }, { text: 'Members' }, { text: 'Media Access' }];
  constructor() { }

  ngOnInit() {
  }

}
