import { Component, OnInit } from '@angular/core';
import { GridColumn } from 'src/app/core/models/grid.column';
import { Member } from 'src/app/core/models/member';
import { Select, Store } from '@ngxs/store';
import { AdminGroupState } from '../../admin-groups-list/state/admin-groups.state';
import { Observable } from 'rxjs';
import { GetMembers, GetMembersByGroupId } from '../../admin-groups-list/state/admin.groups.action';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-group-members',
  templateUrl: './admin-group-members.component.html',
  styleUrls: [ './admin-group-members.component.css', './../../../app.component.css' ]
})
export class AdminGroupMembersComponent implements OnInit {

  members: Member[] = [];
  selectedmembers: any[] = [];

  columns: GridColumn[] = [
    {type: "checkbox", headerText: "Select All", width: "100", field: ""},
    {type: "", headerText: "Name", width: "", field: "name"},
    {type: "", headerText: "Email", width: "", field: "email"},
  ];
 @Select(AdminGroupState.getMembers) getMembers$ : Observable<Member[]>; 
 @Select(AdminGroupState.getMembersByGroupId) getMemberId$: Observable<number []>;

 memberIds: number[] =[];
  constructor(private store: Store, private router:ActivatedRoute) { }

  ngOnInit() {
    this.store.dispatch(new GetMembers());

    this.getMembers$.subscribe(members => (this.members = members));
    const id = Number(this.router.snapshot.paramMap.get('id'));
    this.store.dispatch(new GetMembersByGroupId(id));
    this.getMemberId$.subscribe(memberIds => (this.memberIds = memberIds));
  }

}
