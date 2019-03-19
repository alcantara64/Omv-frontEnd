import { ListComponent } from "./../../shared/list/list.component";
import { Component, OnInit } from "@angular/core";
import { ToolbarItems } from "@syncfusion/ej2-angular-grids";
import { Store, select } from "@ngrx/store";
import { takeWhile } from "rxjs/operators";
import * as fromAdminUsers from "./state/admin-users.reducer";
import * as adminUserActions from "./state/admin-users.actions";
import { User } from "src/app/core/models/User";
import { Observable } from "rxjs";
import { GridColumn } from "src/app/core/models/grid.column";

@Component({
  selector: "app-admin-users",
  templateUrl: "./admin-users-list.component.html",
  styleUrls: ["./admin-users-list.component.css"]
})
export class AdminUsersComponent extends ListComponent implements OnInit {
  public headerText = [
    { text: "Active Users" },
    { text: "Unassigned Users" },
    { text: "Disabled Users" }
  ];
  data = [];
  public toolbar: ToolbarItems[];
  componentActive = true;


  activeUsers: User[];
  unassignedUsers: User[];
  disabledUsers: User[];
  totalActiveUsers: number;
  totalUnassignedUsers: number;
  totalDisabledUsers: number;
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
      headerText: "Email",
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
      headerText: "Group",
      width: "150",
      field: "groups"
    }
  ];
  
  constructor(private store: Store<fromAdminUsers.State>) {
    super();
  }

  ngOnInit() {
    this.toolbar = ["Search"];

    this.store.dispatch(new adminUserActions.LoadActiveUsers());
    this.store.dispatch(new adminUserActions.LoadUnassignedUsers());
    this.store.dispatch(new adminUserActions.LoadDisabledUsers());

    this.store.pipe(select(fromAdminUsers.getActiveUsers),
              takeWhile(() => this.componentActive))
              .subscribe(users =>  {
                this.activeUsers = users;
                this.totalActiveUsers = this.activeUsers.length;
              });

    this.store.pipe(select(fromAdminUsers.getUnassignedUsers),
              takeWhile(() => this.componentActive))
              .subscribe(users => this.unassignedUsers = users);

    this.store.pipe(select(fromAdminUsers.getDisabledUsers),
              takeWhile(() => this.componentActive))
              .subscribe(users => this.disabledUsers = users);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
