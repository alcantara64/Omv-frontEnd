import { Component, OnInit } from '@angular/core';
import { ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import * as fromRoot from '../../state/app.state';
import * as fromUsers from './state/admin-users.reducer';
import * as userActions from './state/admin-users.actions';
import { User } from 'src/app/core/models/User';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users-list.component.html',
  styleUrls: ['./admin-users-list.component.css']
})
export class AdminUsersComponent implements OnInit {
  public headerText = [{ text: "Active Users"}, { text: "Unassigned Users"}, { text: "Disabled Users"}];
  data = [];
  public toolbar: ToolbarItems[];
  componentActive = true;

  activeUsers: User[];

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.toolbar = ['Search'];

    this.store.dispatch(new userActions.LoadActiveUsers());

    this.store.pipe(select(fromUsers.getActiveUsers),
      takeWhile(() => this.componentActive))
      .subscribe(users => this.activeUsers = users);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
