import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../core/models/user";
import {GridColumn} from "../../core/models/grid.column";
import * as userActions from "../admin-users-list/state/admin-users.actions";
import {takeWhile} from "rxjs/operators";
import {ListComponent} from "../../shared/list/list.component";
import {Select, Store} from '@ngxs/store';
import {ShowLeftNav} from "../../state/app.actions";
import {AdminUserState} from "../admin-users-list/state/admin-users.state";
import {Observable} from "rxjs";
import {GetUsers} from "../admin-users-list/state/admin-users.actions";
import {ActivatedRoute, Router} from "@angular/router";

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
  activeUsers: User[];

  @Select(AdminUserState.getActiveUsers) getActiveUsers: Observable<User[]>;

  constructor(private store: Store, private router:Router, private activatedRoute:ActivatedRoute) {
    super();
    this.store.dispatch(new ShowLeftNav(true));
  }

  ngOnInit() {
    this.store.dispatch(new GetUsers());

    this.getActiveUsers.subscribe(users => this.activeUsers = users );
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  onItemClick() {
    // this.router.navigate(['work-set-listings'], { relativeTo: this.activatedRoute});
    console.log('This is a sample text');
  }

}
