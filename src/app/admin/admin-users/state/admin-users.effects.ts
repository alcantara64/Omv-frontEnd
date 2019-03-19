import { AdminUsersService } from './../../../core/services/business/admin-users/admin-users.service';
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as adminUserActions from '../state/admin-users.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from 'src/app/core/models/User';

@Injectable()
export class AdminUsersEffects {

  constructor(private actions$: Actions,
              private adminUserService: AdminUsersService) { }

  @Effect()
  loadActiveUsers$ = this.actions$.pipe(
    ofType(adminUserActions.AdminUserActionTypes.LoadActiveUsers),
    mergeMap((action: adminUserActions.LoadActiveUsers) => this.adminUserService.getActiveUsers().pipe(
      map((users: User[]) => (new adminUserActions.LoadActiveUsersSuccess(users))),
      catchError(err => of(new adminUserActions.LoadActiveUsersFail(err)))
    ))
  )
}