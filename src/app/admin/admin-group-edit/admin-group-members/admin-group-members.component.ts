import { AddGroupMembers } from '../../state/admin-groups/admin.groups.action';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { GridColumn } from 'src/app/core/models/grid.column';
import { Select, Store } from '@ngxs/store';
import { AdminGroupState } from '../../state/admin-groups/admin-groups.state';
import { Observable } from 'rxjs';
import { GetMembers, GetGroupMembers, RemoveGroupMembers } from '../../state/admin-groups/admin.groups.action';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/entity/user';
import { takeWhile } from 'rxjs/operators';
import { EmitType } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { AdminUserState } from '../../state/admin-users/admin-users.state';
import { GetUsers } from '../../state/admin-users/admin-users.actions';

@Component({
  selector: 'app-admin-group-members',
  templateUrl: './admin-group-members.component.html',
  styleUrls: [ './admin-group-members.component.css', './../../../app.component.css' ]
})
export class AdminGroupMembersComponent implements OnInit, OnDestroy {

  groupId: number;
  componentActive = true;
  users: User[] = [];
  member: string;
  groupMembers: User[] =[];

  columns: GridColumn[] = [
    {type: "checkbox", headerText: "Select All", width: "100", field: ""},
    {type: "", headerText: "Name", width: "", field: "name"},
    {type: "", headerText: "Email", width: "", field: "email"},
  ];

  usersFields: Object = { text: 'name', value: 'id' };
  userIds: any;

  @Select(AdminUserState.getUsers) getUsers$: Observable<User[]>;
  @Select(AdminGroupState.getGroupMembers) getGroupMembers$ : Observable<User[]>;

  @ViewChild('groupDialog') public membersDialog: DialogComponent;

  constructor(private store: Store, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.store.dispatch(new GetMembers());
    this.store.dispatch(new GetUsers(null));
    // Get the id in the browser url and reach out for the Group
    this.activatedRoute.paramMap.subscribe(params => {
      this.groupId = Number(params.get('id'));
      this.store.dispatch(new GetGroupMembers(this.groupId));
    }),
    takeWhile(() => this.componentActive);

    this.getGroupMembers$.subscribe(memberIds => (this.groupMembers = memberIds));
    this.getUsers$.subscribe(users => (this.users = users));
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  addGroupMembers(members: User[]) {
    console.log('users ============: ', this.users);
    this.membersDialog.show();
    // const _permissions = permissions.map(permission => permission.id);
    // this.store.dispatch(new UpdateGroupPermissions(this.groupId, _permissions));
    // this.store.dispatch(new GetGroupPermissions(this.groupId));
  }

  removeGroupMembers(members: User[]) {
    if (members.length > 0) {
      const _members = members.map(member => member.userId);
      this.store.dispatch(new RemoveGroupMembers(this.groupId, _members));
      this.store.dispatch(new GetGroupMembers(this.groupId));
    }
  }

  addMembersClick: EmitType<object> = () => {
    console.log('autocomplete - member', this.userIds);

    this.store.dispatch(new AddGroupMembers(this.groupId, this.userIds));
    this.userIds = null;

    this.membersDialog.hide();
    this.store.dispatch(new GetGroupMembers(this.groupId));
  }

  dialogButtons: Object[] = [
    { click: this.addMembersClick.bind(this), buttonModel: { content: 'Add Member(s)', isPrimary: true }}
  ];
}
