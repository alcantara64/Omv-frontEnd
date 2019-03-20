import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../core/models/user";
import {GridColumn} from "../../core/models/grid.column";
import * as userActions from "../admin-users/state/admin-users.actions";
import {select, Store} from "@ngrx/store";
import * as fromUsers from "../admin-users/state/admin-users.reducer";
import {takeWhile} from "rxjs/operators";
import {ListComponent} from "../../shared/list/list.component";

@Component({
  selector: 'app-admin-groups',
  templateUrl: './admin-groups.component.html',
  styleUrls: ['./admin-groups.component.css']
})
export class AdminGroupsComponent extends ListComponent implements OnInit, OnDestroy {

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

  constructor(private store: Store<fromUsers.State>) {
    super();
  }

  ngOnInit() {
    this.store.dispatch(new userActions.LoadActiveUsers());

    this.store
      .pipe(
        select(fromUsers.getActiveUsers),
        takeWhile(() => this.componentActive)
      )
      .subscribe(users => {
        this.groups = users;
        console.log("This is a group ", this.groups);
      });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

}
