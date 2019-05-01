import { AddGroupMembers } from '../../state/admin-groups/admin-groups.action';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { GridColumn } from 'src/app/core/models/grid.column';
import { Select, Store } from '@ngxs/store';
import { AdminGroupState } from '../../state/admin-groups/admin-groups.state';
import { Observable } from 'rxjs';
import { GetMembers, GetGroupMembers, RemoveGroupMembers } from '../../state/admin-groups/admin-groups.action';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/entity/user';
import { takeWhile } from 'rxjs/operators';
import { EmitType } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { AdminUserState } from '../../state/admin-users/admin-users.state';
import { GetUsers } from '../../state/admin-users/admin-users.actions';
import { DisplayToastMessage } from 'src/app/state/app.actions';
import { ToastType } from 'src/app/core/enum/toast';

@Component({
  selector: 'app-admin-group-members',
  templateUrl: './admin-group-members.component.html',
  styleUrls: ['./admin-group-members.component.css', './../../../app.component.css']
})
export class AdminGroupMembersComponent implements OnInit, OnDestroy {
  selectedMember: any;
  constructor(private store: Store, private activatedRoute: ActivatedRoute) { }

  groupId: number;
  componentActive = true;
  users: User[] = [];
  member: string;
  groupMembers: User[] = [];

  columns: GridColumn[] = [
    { type: "checkbox", headerText: "Select All", width: "100", field: "" },
    { type: "", headerText: "Name", width: "", field: "displayName" },
    { type: "", headerText: "Email", width: "", field: "emailAddress" },
  ];

  usersFields: Object = { text: 'displayName', value: 'userId' };
  userIds: any;

  @Select(AdminUserState.getUsers) getUsers$: Observable<User[]>;
  @Select(AdminGroupState.getGroupMembers) getGroupMembers$: Observable<User[]>;

  @ViewChild('groupDialog') public membersDialog: DialogComponent;
  @ViewChild('confirmDialog')
  public confirmDialog: DialogComponent;


  ngOnInit() {
    this.store.dispatch(new GetMembers());
    this.store.dispatch(new GetUsers(null));
    // Get the id in the browser url and reach out for the Group
    this.activatedRoute.paramMap.subscribe(params => {
      this.groupId = Number(params.get('id'));
      this.store.dispatch(new GetGroupMembers(this.groupId));
    }),
      takeWhile(() => this.componentActive);

    this.getUsers$.subscribe(users => this.users = users);
    this.getGroupMembers$.subscribe(memberIds => {
      this.groupMembers = memberIds;
});
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
  show(event) {
    console.log('event', event);
    this.selectedMember = event;
    this.confirmDialog.show();
  }

  public RemoveDlgBtnClick: EmitType<object> = () => {
    const _members = this.selectedMember.map(member => member.userId);
    this.store.dispatch(new RemoveGroupMembers(this.groupId, _members));
    this.store.dispatch(new GetGroupMembers(this.groupId));
    this.confirmDialog.hide();
  }
  public closeBtnDlgClick: EmitType<object> = () => {
    this.confirmDialog.hide();
}


  confirmDlgButtons = [{ click: this.RemoveDlgBtnClick.bind(this),  buttonModel: { content: 'Yes', isPrimary: true } }, 
  { click: this.closeBtnDlgClick.bind(this), buttonModel: { content: 'No' } }];


addMembersClick: EmitType < object > = () => {
  let memberIds = this.groupMembers.map(ids => ids.userId);
  const found = memberIds.some(r=> this.userIds.includes(r))
  console.log(found);
  if(!found){
    this.store.dispatch(new AddGroupMembers(this.groupId, this.userIds));
    this.userIds = null;
  }
  else{
    this.store.dispatch(new DisplayToastMessage('Member Exists', ToastType.error));
    this.userIds = null;
  }
  this.membersDialog.hide();
}
cancelRemove() {
  this.confirmDialog.hide();
}
dialogButtons: Object[] = [
  { click: this.addMembersClick.bind(this), buttonModel: { content: 'Add Member(s)', isPrimary: true } }];

}
