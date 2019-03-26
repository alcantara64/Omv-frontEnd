import { EmitType } from '@syncfusion/ej2-base';
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
import {
  GetUsers,
  DisableUser,
  EnableUser,
  SearchUsers,
  SetCurrentUserId,
  AssignToGroups
} from './state/admin-users.actions';
import { AdminGroupState } from '../admin-groups-list/state/admin-groups.state';
import { permission } from 'src/app/core/enum/permission';
import { TextBox } from '@syncfusion/ej2-inputs';
import { TextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { Router, ActivatedRoute } from '@angular/router';
import { DISABLED } from '@angular/forms/src/model';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';

@Component({
  selector: 'app-admin-users-list',
  templateUrl: './admin-users-list.component.html',
  styleUrls: ['./admin-users-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminUsersListComponent extends ListComponent implements OnInit {
  selectedUsers: User[];
  groups: Group[] = [];
  users: User[];
  statusChange: string;
  ENABLE = 'Enable';
  DISABLE = 'Disable';
  public groupFields = { text: 'name', value: 'id' };
  groupid: number;
  name: string;
  urlparam: string;
  columns: GridColumn[] = [
    { type: 'checkbox', headerText: 'Select All', width: '50', field: '' },
    { type: '', headerText: 'Name', width: '', field: 'name' },
    { type: '', headerText: 'Email', width: '', field: 'email' },
    { type: '', headerText: 'Last Modified', width: '', field: 'modifiedBy' },
    { type: '', headerText: 'Group', width: '150', field: 'groups' }
  ];

  @Select(AdminUserState.getActiveUsers) activeUsers$: Observable<User[]>;
  @Select(AdminUserState.getUnassignedUsers) unassignedUsers$: Observable<User[]>;
  @Select(AdminUserState.getDisabledUsers) disabledUsers$: Observable<User[]>;
  @Select(AdminGroupState.getGroups) groups$: Observable<Group[]>;

  @ViewChild('groupDialog')
  public groupDialog: DialogComponent;

  @ViewChild('listviewgroup')
  public groupDialogList: any;

  public target = '.control-section';

  public saveDlgBtnClick: EmitType<object> = () => {
    console.log('Dialog save button');

    const groupdata = this.groupDialogList.getSelectedItems().data;
    const groupidArray: any[] = [];

    groupdata.forEach(group => {
      groupidArray.push(group.id);
    });

    this.selectedUsers.forEach(user => {
      this.store.dispatch(new AssignToGroups(user.id, groupidArray));
    });


    this.groupDialog.hide();
    this.store.dispatch(new GetUsers());

  }


  public saveDlgButtons: Object[] = [{ click: this.saveDlgBtnClick.bind(this), buttonModel: { content: 'Save', isPrimary: true } }];

  constructor(
    protected store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(store);
    this.ShowLefNav(true);
    this.Permission = permission.VIEW_USERS;
    this.PageTitle('Admin User');

  }

  ngOnInit() {
    this.store.dispatch(new GetGroups());

    this.activatedRoute.params.subscribe(params => {
      this.store.dispatch(new GetUsers());
      this.displayUsers(params.type);
    });

    this.groups$.subscribe(groups => (this.groups = groups));
  }


  displayUsers(param: string) {
    this.urlparam = param;
    switch (param) {
      case AdminUserType.Active:
        this.activeUsers$.subscribe(activeUsers => (this.users = activeUsers));
        this.statusChange = this.DISABLE;
        break;
      case AdminUserType.Unassigned:
        this.unassignedUsers$.subscribe(
          unassignedUsers => (this.users = unassignedUsers)
        );
        this.statusChange = '';
        break;
      case AdminUserType.Disabled:
        this.disabledUsers$.subscribe(
          disabledUsers => (this.users = disabledUsers)
        );
        this.statusChange = this.ENABLE;
        break;
      default:
        break;
    }
  }

  search() {
    this.store.dispatch(new SearchUsers(this.name, this.groupid));
  }

  changeUsersStatus(users: User[]) {

    users.forEach(user => {
      if ((this.statusChange === this.ENABLE)) {
        this.store.dispatch(new EnableUser(user.id, user));
      } else {
        this.store.dispatch(new DisableUser(user.id, user));
      }
    });
  }

  assignUsersToGroups(users: User[]) {
    console.log('AdminUsersListComponent - assignUsersToGroups');
    this.groupDialog.show();
    this.selectedUsers = users;

  }

  edit(id: number) {
    this.store.dispatch(new SetCurrentUserId(id));
    this.router.navigate([`/admin/users/${id}/edit`]);
  }




}
