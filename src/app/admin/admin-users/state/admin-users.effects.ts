import { getActiveUsers } from './admin-users.reducer';
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as userActions from '../state/admin-users.actions'
import { UsersService } from 'src/app/core/services/business/users.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from 'src/app/core/models/User';

@Injectable()
export class UsersEffects {

  constructor(private actions$: Actions,
              private userService: UsersService) { }

  @Effect()
  loadActiveUsers$ = this.actions$.pipe(
    ofType(userActions.UserActionTypes.LoadActiveUsers),
    mergeMap((action: userActions.LoadActiveUsers) => this.userService.getActiveUsers().pipe(
      map((users: User[]) => (new userActions.LoadActiveUsersSuccess(users))),
      catchError(err => of(new userActions.LoadActiveUsersFail(err)))
    ))
  )
}