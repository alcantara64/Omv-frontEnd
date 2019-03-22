import { AdminUserType } from './../../core/enum/admin-user-type';
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
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-users-list',
  templateUrl: './admin-users-list.component.html',
  styleUrls: ['./admin-users-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminUsersListComponent extends ListComponent implements OnInit {

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

  users: User[];

  @Select(AdminUserState.getActiveUsers) activeUsers$: Observable<User[]>;
  @Select(AdminUserState.getUnassignedUsers) unassignedUsers$: Observable<User[]>;
  @Select(AdminUserState.getDisabledUsers) disabledUsers$: Observable<User[]>;
  @Select(AdminGroupState.getGroups) groups$: Observable<Group[]>;
  isModal= false;


  activatedRoute: ActivatedRoute;

  constructor(protected store: Store, private router: Router, activatedRoute: ActivatedRoute,) {
    super(store);
    this.ShowLefNav(true);
    this.Permission = permission.VIEW_USERS;
    this.activatedRoute = activatedRoute;
 }

  ngOnInit() {
    console.log(this.isModal);

    
    this.store.dispatch(new GetGroups());

    this.activatedRoute.params.subscribe(
      (params) => {
        this.store.dispatch(new GetUsers());
        this.displayUsers(params.type);
      }
    );

    this.groups$.subscribe(groups => this.groups = groups);
  }

  ngOnDestroy(): void {

  }

  displayUsers(param: string) {
    console.log(param);
    switch (param) {
      case AdminUserType.Active:
      this.activeUsers$.subscribe(activeUsers => this.users = activeUsers );
      console.log(param);
        break;
      case AdminUserType.Unassigned:
      this.unassignedUsers$.subscribe(unassignedUsers => this.users = unassignedUsers );
      console.log(param);
        break;
      case AdminUserType.Disabled:
      this.disabledUsers$.subscribe(disabledUsers => this.users = disabledUsers );
      console.log(param);
        break;    
      default:
        break;
    }
  }

  search() {
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
  openModal() {
    this.isModal = !this.isModal;
  }
  modalDlgOpen() {
    this.isModal = true;
  }
  modalDlgClose(){
    this.isModal =  false;
  }
  edit(id: number) {
    console.log('edit: ', id);
    this.store.dispatch(new SetCurrentUserId(id));
    this.router.navigate([`/admin/users/${id}/edit`]);
  }
}
