import { GetGroups } from './../admin-groups-list/state/admin.groups.action';
import { Group } from './../../core/models/group';
import { ShowLeftNav } from './../../state/app.actions';
import { ListComponent } from './../../shared/list/list.component';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { User } from 'src/app/core/models/User';
import { Observable } from 'rxjs';
import { GridColumn } from 'src/app/core/models/grid.column';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { Store, Select } from '@ngxs/store';
import { AdminUserState } from './state/admin-users.state';
import { GetUsers, DisableUser, EnableUser, SearchUsers, SetCurrentUserId } from './state/admin-users.actions';
import { AdminGroupState } from '../admin-groups-list/state/admin-groups.state';
import { permission } from 'src/app/core/enum/permission';
import { TextBox } from '@syncfusion/ej2-inputs';
import { TextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-users-list',
  templateUrl: './admin-users-list.component.html',
  styleUrls: ['./admin-users-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminUsersListComponent extends ListComponent implements OnInit {
  public headerText = [
    { text: 'Active Users' },
    { text: 'Unassigned Users' },
    { text: 'Disabled Users' }
  ];



  activeUsers: User[];
  unassignedUsers: User[];
  disabledUsers: User[];
  selectedUsers: User[];
  totalActiveUsers: number;
  totalUnassignedUsers: number;
  totalDisabledUsers: number;
  groups: Group[] = [];



  public groupFields: Object = { text: 'name', value: 'id' };
  groupid: number;
  name: string;

  columns: GridColumn[] = [
    {
      type: 'checkbox',
      headerText: 'Select All',
      width: '50',
      field: ''
    },
    {
      type: '',
      headerText: 'Name',
      width: '',
      field: 'name'
    },
    {
      type: '',
      headerText: 'Email',
      width: '',
      field: 'email'
    },
    {
      type: '',
      headerText: 'Last Modified',
      width: '',
      field: 'modifiedBy'
    },
    {
      type: '',
      headerText: 'Group',
      width: '150',
      field: 'groups'
    }
  ];


  @Select(AdminUserState.getActiveUsers) getActiveUsers: Observable<User[]>;
  @Select(AdminUserState.getUnassignedUsers) getUnassignedUsers: Observable<User[]>;
  @Select(AdminUserState.getDisabledUsers) getDisabledUsers: Observable<User[]>;
  @Select(AdminGroupState.getGroups) groups$: Observable<Group[]>;


  constructor(protected store: Store, private router: Router) {
    super(store);
    this.ShowLefNav(true);
    this.Permission = permission.VIEW_USERS;
 }

  ngOnInit() {

    this.store.dispatch(new GetUsers());
    this.store.dispatch(new GetGroups());

    this.getActiveUsers.subscribe(users => this.activeUsers = users );
    this.getUnassignedUsers.subscribe(users => this.unassignedUsers = users );
    this.getDisabledUsers.subscribe(users => this.disabledUsers = users );
    this.groups$.subscribe(groups => this.groups = groups);
  }

  ngOnDestroy(): void {

  }

  search() {
    console.log('search');
     console.log("group value is " + this.groupid);
     console.log("name value is " + this.name);
    this.store.dispatch(new SearchUsers(this.name, this.groupid));
  }

  enableUsers(users: User[]) {
    users.forEach(user => {
      this.store.dispatch(new EnableUser(user.id, user));
    });
  }

  disableUsers(users: User[]) {
    users.forEach(user => {
      this.store.dispatch(new DisableUser(user.id, user));
    });
  }

  assignUsersToGroups(users: User[]) {
    users.forEach(user => {
      // this.store.dispatch(new DisableUser(user.id, user));
    });
  }

  edit(id: number) {
    console.log('edit: ', id);
    this.store.dispatch(new SetCurrentUserId(id));
    this.router.navigate([`/admin/users/${id}`]);
  }
}
