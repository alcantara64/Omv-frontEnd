import { User } from 'src/app/core/models/User';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminUserActionTypes, AdminUserActions } from './admin-users.actions';
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

export function reducer(state = initialState, action: AdminUserActions) {
  switch(action.type) {
    case AdminUserActionTypes.LoadActiveUsersSuccess:
      return {
        ...state,
        activeUsers: action.payload,
        error: ''
      }
    
    case AdminUserActionTypes.LoadActiveUsersFail:
      return {
        ...state,
        activeUsers: [],
        error: action.payload
      }

    case AdminUserActionTypes.LoadUnassignedUsersSuccess:
      return {
        ...state,
        unassignedUsers: action.payload,
        error: ''
      }
    
    case AdminUserActionTypes.LoadUnassignedUsersFail:
      return {
        ...state,
        unassignedUsers: [],
        error: action.payload
      }

    case AdminUserActionTypes.LoadDisabledUsersSuccess:
      return {
        ...state,
        disabledUsers: action.payload,
        error: ''
      }
    
    case AdminUserActionTypes.LoadDisabledUsersFail:
      return {
        ...state,
        disabledUsers: [],
        error: action.payload
      }

    default:
      return state;
  }
}