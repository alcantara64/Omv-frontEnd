import { GetGroup } from './../../admin-groups-list/state/admin.groups.action';
import { Tab } from './../../../core/models/tab';
import { GridColumn } from './../../../core/models/grid.column';
import { Group } from './../../../core/models/group';
import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { GetGroups } from '../../admin-groups-list/state/admin.groups.action';
import { AdminGroupState } from '../../admin-groups-list/state/admin-groups.state';
import { Observable } from 'rxjs';
import { GetUsers, GetUser, GetGroupsByUserId } from '../../admin-users-list/state/admin-users.actions';
import { AdminUserState } from '../../admin-users-list/state/admin-users.state';
import { User } from 'src/app/core/models/User';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-user-groups',
  templateUrl: './admin-user-groups.component.html',
  styleUrls: ['./admin-user-groups.component.css']
})
export class AdminUserGroupsComponent implements OnInit {

  groups: Group[] = [];
  columns: GridColumn[] = [
    { type: 'checkbox', headerText: 'Select All', width: '100', field: 'id' },
    { type: '', headerText: 'Groups', width: '', field: 'name' }
  ];

  initialGroups: number[] = [];
  userList: Group[] = []  ;


  @Select(AdminGroupState.getGroups) groups$: Observable<Group[]>;
  @Select(AdminUserState.getGroupsByUserId) groupsId$: Observable<number[]>;

  constructor(private store: Store,
              private router: ActivatedRoute) { }

  ngOnInit() {
    this.store.dispatch(new GetGroups());
    this.groups$.subscribe(groups => (this.groups = groups));

    let id = Number(this.router.snapshot.paramMap.get('id'));
    this.store.dispatch(new GetGroupsByUserId(1));
    
    this.groupsId$.subscribe(users => this.initialGroups = users) ;
    console.log('user', this.initialGroups);

  }

  save(args) {
      console.log('AdminUserGroupsComponent - save');
      console.log(args);
      const groupidArray: any[] = [];

      args.data.forEach(group => {
          groupidArray.push(group.id);
      });


      // this.store.dispatch(new AssignToGroups(user.id, groupidArray));
      this.store.dispatch(new GetGroups());

  }
}
