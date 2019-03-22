import { Tab } from './../../../core/models/tab';
import { GridColumn } from './../../../core/models/grid.column';
import { Group } from './../../../core/models/group';
import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { GetGroups } from '../../admin-groups-list/state/admin.groups.action';
import { AdminGroupState } from '../../admin-groups-list/state/admin-groups.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-user-groups',
  templateUrl: './admin-user-groups.component.html',
  styleUrls: ['./admin-user-groups.component.css']
})
export class AdminUserGroupsComponent implements OnInit {

  groups: Group[] = [];
  columns: GridColumn[] = [
    { type: "checkbox", headerText: "Select All", width: "100", field: "id" },
    { type: "", headerText: "Groups", width: "", field: "name" }
  ];

  initialGroups: number[] = [2,5,6];



  @Select(AdminGroupState.getGroups) groups$: Observable<Group[]>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetGroups());
    this.groups$.subscribe(groups => (this.groups = groups));
  }

  save(args) {
      console.log("AdminUserGroupsComponent - save");
      console.log(args);

  }
}
