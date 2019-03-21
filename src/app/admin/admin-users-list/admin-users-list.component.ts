import { ShowLeftNav } from './../../state/app.actions';
import { ListComponent } from "./../../shared/list/list.component";
import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from "@angular/core";
import { ToolbarItems } from "@syncfusion/ej2-angular-grids";
import { User } from "src/app/core/models/User";
import { Observable } from "rxjs";
import { GridColumn } from "src/app/core/models/grid.column";
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { Store, Select } from '@ngxs/store';
import { AdminUserState } from './state/admin-users.state';
import { GetUsers, DisableUser } from './state/admin-users.actions';

@Component({
  selector: "app-admin-users-list",
  templateUrl: "./admin-users-list.component.html",
  styleUrls: ["./admin-users-list.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class AdminUsersListComponent extends ListComponent implements OnInit {
  public headerText = [
    { text: "Active Users" },
    { text: "Unassigned Users" },
    { text: "Disabled Users" }
  ];
  @ViewChild('element') tabInstance: TabComponent
  @ViewChild('previousAnimation') previousInstance: DropDownListComponent;
  @ViewChild('nextAnimation') nextInstance: DropDownListComponent;
  data = [];
  public toolbar: ToolbarItems[];
  componentActive = true;

  activeUsers: User[];
  unassignedUsers: User[];
  disabledUsers: User[];
  selectedUsers: User[];
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
    

  @Select(AdminUserState.getActiveUsers) getActiveUsers: Observable<User[]>;
  @Select(AdminUserState.getUnassignedUsers) getUnassignedUsers: Observable<User[]>;
  @Select(AdminUserState.getDisabledUsers) getDisabledUsers: Observable<User[]>;
  
  constructor(private store: Store) {
    super();
    // this.tabInstance.animation.previous.effect = 'None';
    // this.tabInstance.animation.next.effect = 'None';
    
    this.store.dispatch(new ShowLeftNav(true));
  }

  ngOnInit() {
    this.toolbar = ["Search"];


    this.store.dispatch(new GetUsers());

    this.getActiveUsers.subscribe(users => this.activeUsers = users );
    this.getUnassignedUsers.subscribe(users => this.unassignedUsers = users );
    this.getDisabledUsers.subscribe(users => this.disabledUsers = users );
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  performGridAction(users: User[]) {
    users.forEach(user => {
      this.store.dispatch(new DisableUser(user.id, user));
    });
  }
}
