import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../core/models/user";
import {GridColumn} from "../../core/models/grid.column";
import * as userActions from "../admin-users-list/state/admin-users.actions";
import {takeWhile} from "rxjs/operators";
import {ListComponent} from "../../shared/list/list.component";
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { AdminGroupState } from './state/admin-groups.state';
import { Observable } from 'rxjs';
import { Group } from 'src/app/core/models/group';

@Component({
  selector: 'app-admin-groups-list',
  templateUrl: './admin-groups-list.component.html',
  styleUrls: ['./admin-groups-list.component.css']
})
export class AdminGroupsListComponent extends ListComponent implements OnInit, OnDestroy {

  groups: User[];
  columns: GridColumn[] = [
    {
      type: "checkbox",
      headerText: "Select All",
      width: "50",
      field: ""
    },
    {
      type: "",
      headerText: "Name",
      width: "",
      field: "name"
    },
    {
      type: "",
      headerText: "Description",
      width: "",
      field: "email"
    },
    {
      type: "",
      headerText: "Last Modified",
      width: "",
      field: "modifiedBy"
    },
    {
      type: "",
      headerText: "Modified By",
      width: "150",
      field: "groups"
    },
    {
      type: "",
      headerText: "Members",
      width: "150",
      field: "email"
    }
  ];
  private componentActive = true;


  @Select(AdminGroupState.getGroups) getActiveUsers: Observable<Group[]>;
  @Select(AdminGroupState.getCurrentGroup) getUnassignedUsers: Observable<Group[]>;
  // @Select(AdminGroupState.getDisabledUsers) getDisabledUsers: Observable<Group[]>;
  constructor(private store: Store) {
    super();
  }

  ngOnInit() {
    // this.store.dispatch(new userActions.LoadActiveUsers());

    // this.store
    //   .pipe(
    //     select(fromUsers.getActiveUsers),
    //     takeWhile(() => this.componentActive)
    //   )
    //   .subscribe(users => {
    //     this.groups = users;
    //     console.log("This is a group ", this.groups);
    //   });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

}
