import { Tab } from 'src/app/core/models/tab';
import { GetGroups } from './../admin-groups-list/state/admin.groups.action';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import { ShowLeftNav } from 'src/app/state/app.actions';
import { GetUsers } from "../admin-users-list/state/admin-users.actions";
import { AdminUserState } from "../admin-users-list/state/admin-users.state";
import { Observable } from "rxjs";
import { User } from "../../core/models/user";
import { ListComponent } from "../../shared/list/list.component";
import { GridColumn } from "../../core/models/grid.column";
import { Group } from 'src/app/core/models/group';

@Component({
  selector: 'app-admin-group-edit',
  templateUrl: './admin-group-edit.component.html',
  styleUrls: ['./admin-group-edit.component.css']
})
export class AdminGroupEditComponent extends ListComponent implements OnInit {

  activeUsers: User[];
  unassignedUsers: User[];
  disabledUsers: User[];

  showPermissions: boolean;
  showMembers: boolean;
  showMediaAccess: boolean;

  groupForm: FormGroup;
  group = new Group();
  groupsTabs: Tab[] = [
    { link: '1', name: 'Permissions' },
    { link: '2', name: 'Members' },
    { link: '3', name: 'Media Access' }
  ];

  memberColumns: GridColumn[] = [
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
    }

  ];

  permissionColumns: GridColumn[] = [
    {
      type: "checkbox",
      headerText: "Select All",
      width: "50",
      field: ""
    },
    {
      type: "",
      headerText: "Permission Title",
      width: "",
      field: "name"
    }
  ];

  public countries: Object[] = [
    { id: 1, name: 'Australia', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'New South Wales' },
    { id: 3, pid: 1, name: 'Victoria' },
    { id: 4, pid: 1, name: 'South Australia' },
    { id: 6, pid: 1, name: 'Western Australia' },
    { id: 7, name: 'Brazil', hasChild: true },
    { id: 8, pid: 7, name: 'Paraná' },
    { id: 9, pid: 7, name: 'Ceará' },
    { id: 10, pid: 7, name: 'Acre' },
    { id: 11, name: 'China', hasChild: true },
    { id: 12, pid: 11, name: 'Guangzhou' },
    { id: 13, pid: 11, name: 'Shanghai' },
    { id: 14, pid: 11, name: 'Beijing' },
    { id: 15, pid: 11, name: 'Shantou' },
    { id: 16, name: 'France', hasChild: true },
    { id: 17, pid: 16, name: 'Pays de la Loire' },
    { id: 18, pid: 16, name: 'Aquitaine' },
    { id: 19, pid: 16, name: 'Brittany' },
    { id: 20, pid: 16, name: 'Lorraine' },
    { id: 21, name: 'India', hasChild: true },
    { id: 22, pid: 21, name: 'Assam' },
    { id: 23, pid: 21, name: 'Bihar' },
    { id: 24, pid: 21, name: 'Tamil Nadu' },
    { id: 25, pid: 21, name: 'Punjab' }
  ];

  public field:Object = { dataSource: this.countries, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };

  public showCheckBox:boolean = true;

  @Select(AdminUserState.getActiveUsers) getActiveUsers: Observable<User[]>;
  @Select(AdminUserState.getUnassignedUsers) getUnassignedUsers: Observable<User[]>;
  @Select(AdminUserState.getDisabledUsers) getDisabledUsers: Observable<User[]>;

  constructor(protected store: Store, private fb: FormBuilder) {
    super(store);

    this.store.dispatch(new ShowLeftNav(false));
  }

  ngOnInit() {

    // this.store.dispatch(new GetPermissions());

    this.groupForm = this.fb.group({
      name: ['', [ Validators.required, Validators.minLength(3)] ],
      description: ['']
    });

    this.showPermissions = true;
    this.groupsTabs[0].isActive = true;

    this.getActiveUsers.subscribe(users => this.activeUsers = users );
    this.getUnassignedUsers.subscribe(users => this.unassignedUsers = users );
    this.getDisabledUsers.subscribe(users => this.disabledUsers = users );
  }

  ngOnDestroy(): void {
    
  }

  save() {
    console.log(this.groupForm);
    console.log('Saved: ' + JSON.stringify(this.groupForm.value));
  }

  switchTabs(tabLink: string) {
    this.showPermissions = this.showMembers = this.showMediaAccess = false;
    this.groupsTabs.map(x => x.isActive = false);
    switch (tabLink) {
      case '1':
        this.showPermissions = true;
        this.groupsTabs[0].isActive = true;
        break;
      case '2':
        this.showMembers = true;
        this.groupsTabs[1].isActive = true;
        break;
      case '3':
        this.showMediaAccess = true;
        this.groupsTabs[2].isActive = true;
        break;    
      default:
        break;
    }
  }
}
