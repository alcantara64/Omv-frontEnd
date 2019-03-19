import { BaseComponent } from "./../../shared/base/base.component";
import { ListComponent } from "./../../shared/list/list.component";
import { Component, OnInit } from "@angular/core";
import { ToolbarItems } from "@syncfusion/ej2-angular-grids";
import { Store, select } from "@ngrx/store";
import { takeWhile } from "rxjs/operators";
import * as fromUsers from "./state/admin-users.reducer";
import * as userActions from "./state/admin-users.actions";
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
      field: "Name"
    },
    {
      type: "",
      headerText: "Email",
      width: "",
      field: "Email"
    },
    {
      type: "",
      headerText: "Last Modified",
      width: "",
      field: "Modifiedby"
    },
    {
      type: "",
      headerText: "Group",
      width: "150",
      field: "Groups"
    }
  ];

  constructor(private store: Store<fromUsers.State>) {
    super();
  }

  ngOnInit() {
    this.toolbar = ["Search"];

    this.store.dispatch(new userActions.LoadActiveUsers());

    this.store
      .pipe(
        select(fromUsers.getActiveUsers),
        takeWhile(() => this.componentActive)
      )
      .subscribe(users => (this.activeUsers = users));
  }

  public populateList(): Observable<any[]> {
    console.log("admin users populateList");
    return this.store.pipe(select(fromUsers.getActiveUsers));
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
