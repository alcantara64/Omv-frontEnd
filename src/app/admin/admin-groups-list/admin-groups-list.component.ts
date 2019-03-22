import { GetGroups } from './state/admin.groups.action';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { GridColumn } from "../../core/models/grid.column";
import {ListComponent} from "../../shared/list/list.component";
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { AdminGroupState } from './state/admin-groups.state';
import { Observable } from 'rxjs';
import { Group } from 'src/app/core/models/group';
import { ShowLeftNav } from 'src/app/state/app.actions';

@Component({
  selector: 'app-admin-groups-list',
  templateUrl: './admin-groups-list.component.html',
  styleUrls: ['./admin-groups-list.component.css']
})
export class AdminGroupsListComponent extends ListComponent implements OnInit, OnDestroy {

  groups: Group[];
  columns: GridColumn[] = [
    {type: "checkbox", headerText: "Select All", width: "50", field: ""},
    {type: "", headerText: "Name", width: "", field: "name"},
    {type: "", headerText: "Description", width: "", field: "email"},
    {type: "", headerText: "Last Modified", width: "", field: "modifiedBy"},
    {type: "", headerText: "Modified By", width: "150", field: "groups"},
    {type: "", headerText: "Members", width: "150", field: "email"}
  ];
  private componentActive = true;

  @Select(AdminGroupState.getGroups) groups$: Observable<Group[]>;

  constructor(protected store: Store) {
    super(store);

    this.store.dispatch(new ShowLeftNav(true));
  }

  ngOnInit() {
    this.store.dispatch(new GetGroups());

    this.groups$.subscribe(_groups => this.groups = _groups);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

}
