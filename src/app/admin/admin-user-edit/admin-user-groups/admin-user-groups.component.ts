import { ClearUserGroups } from './../../state/admin-users/admin-users.actions';
import { GetGroup } from '../../state/admin-groups/admin.groups.action';
import { Tab } from './../../../core/models/tab';
import { GridColumn } from './../../../core/models/grid.column';
import { Group } from '../../../core/models/entity/group';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { GetGroups } from '../../state/admin-groups/admin.groups.action';
import { AdminGroupState } from '../../state/admin-groups/admin-groups.state';
import { Observable } from 'rxjs';
import { GetUserGroups, UpdateUserGroups } from '../../state/admin-users/admin-users.actions';
import { AdminUserState } from '../../state/admin-users/admin-users.state';
import { ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-admin-user-groups',
  templateUrl: './admin-user-groups.component.html',
  styleUrls: ['./admin-user-groups.component.css']
})
export class AdminUserGroupsComponent implements OnInit, OnDestroy {

  userId: number;
  groups: Group[] = [];
  columns: GridColumn[] = [
    { type: 'checkbox', headerText: 'Select All', width: '100', field: '' },
    { type: '', headerText: 'Groups', width: '', field: 'name' }
  ];

  userGroupIds: number[] = [];
  componentActive = true;

  @Select(AdminGroupState.getGroups) groups$: Observable<Group[]>;
  @Select(AdminUserState.getGroups) userGroups$: Observable<Group[]>;

  constructor(private store: Store,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.store.dispatch(new GetGroups());
    this.groups$.subscribe(groups => this.groups = groups);

    // Get the id in the browser url and reach out for the User
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = Number(params.get('id'));
      if (this.userId) {
        this.store.dispatch(new GetUserGroups(this.userId));
      } else {
        this.store.dispatch(new ClearUserGroups());
      }
    }),
    takeWhile(() => this.componentActive);

    this.userGroups$.subscribe(groups => {
      if (groups) {
        this.userGroupIds = groups.map(x => x.id);
      }
    });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  updateGroups(selectedGroups: Group[]) {
    const groupIds = selectedGroups.map(group => group.id);
    this.store.dispatch(new UpdateUserGroups(this.userId, groupIds)).toPromise().then(() => {
      console.log('AdminUserGroupsComponent - updateGroups');
      this.store.dispatch(new GetUserGroups(this.userId));
    });

  }
}
