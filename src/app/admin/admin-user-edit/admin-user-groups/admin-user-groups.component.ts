import { ClearUserGroups } from './../../state/admin-users/admin-users.actions';
import { GridColumn } from './../../../core/models/grid.column';
import { Group } from '../../../core/models/entity/group';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { GetGroups } from '../../state/admin-groups/admin-groups.action';
import { AdminGroupState } from '../../state/admin-groups/admin-groups.state';
import { Observable } from 'rxjs';
import { GetUserGroups, UpdateUserGroups } from '../../state/admin-users/admin-users.actions';
import { AdminUserState } from '../../state/admin-users/admin-users.state';
import { ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import {BaseComponent} from "../../../shared/base/base.component";
import { SetSelectedItems } from 'src/app/media/state/media/media.action';

@Component({
  selector: 'app-admin-user-groups',
  templateUrl: './admin-user-groups.component.html',
  styleUrls: ['./admin-user-groups.component.css']
})
export class AdminUserGroupsComponent extends BaseComponent implements OnInit, OnDestroy {

  userId: number;
  groups: Group[] = [];
  columns: GridColumn[] = [
    { type: 'checkbox', headerText: 'Select All', width: '100', field: '' },
    { type: '', headerText: 'Groups', width: '', field: 'name' }
  ];

  userGroupIds: number[] = [];
  componentActive = true;

  @Select(AdminGroupState.getActiveGroups) groups$: Observable<Group[]>;
  @Select(AdminUserState.getGroups) userGroups$: Observable<Group[]>;

  constructor(protected store: Store,
              protected activatedRoute: ActivatedRoute) { super(store) }

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
      this.userGroups$.subscribe(groups => {
        if (groups) {
          this.userGroupIds = groups.map(x => x.id);
        }
      });
    }),
    takeWhile(() => this.componentActive);

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

  selectedItemData(data: any[]) {
    console.log('selectedItemData',data);
    this.store.dispatch(new SetSelectedItems(data));
  }
}