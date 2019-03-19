import { User } from 'src/app/core/models/User';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActionTypes, UserActions } from './admin-users.actions';
import * as fromRoot from '../../../state/app.state';

export interface State extends fromRoot.State {
  users: UserState;
}

export interface UserState {  
  activeUsers: User[];
  unassignedUsers: User[];
  disabledUsers: User[];
  error: string;
}

const initialState: UserState = {
  activeUsers: null,
  unassignedUsers: null,
  disabledUsers: null,
  error: ''
}

const getAdminUsersFeatureState = createFeatureSelector<UserState>('admin.users');

export const getActiveUsers = createSelector(
  getAdminUsersFeatureState,
  state => state.activeUsers
);

export const getUnassignedUsers = createSelector(
  getAdminUsersFeatureState,
  state => state.unassignedUsers
);

export const getDisabledUsers = createSelector(
  getAdminUsersFeatureState,
  state => state.disabledUsers
);

export function reducer(state = initialState, action: UserActions) {
  switch(action.type) {
    case UserActionTypes.LoadActiveUsersSuccess:
      return {
        ...state,
        activeUsers: action.payload,
        error: ''
      }
    
    case UserActionTypes.LoadActiveUsersFail:
      return {
        ...state,
        activeUsers: [],
        error: action.payload
      }

    case UserActionTypes.LoadUnassignedUsersSuccess:
      return {
        ...state,
        activeUsers: action.payload,
        error: ''
      }
    
    case UserActionTypes.LoadUnassignedUsersFail:
      return {
        ...state,
        activeUsers: [],
        error: action.payload
      }

    case UserActionTypes.LoadDisabledUsersSuccess:
      return {
        ...state,
        activeUsers: action.payload,
        error: ''
      }
    
    case UserActionTypes.LoadDisabledUsersFail:
      return {
        ...state,
        activeUsers: [],
        error: action.payload
      }

    default:
      return state;
  }
}