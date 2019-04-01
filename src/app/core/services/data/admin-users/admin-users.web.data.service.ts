import { User_InsertRoleInputDTO } from './../../../dtos/input/users/User_InsertRoleInputDTO';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AdminUsersDataService } from './admin-users.data.service';
import { User } from 'src/app/core/models/entity/user';
import { User_SearchInputDTO } from 'src/app/core/dtos/input/users/User_SearchInputDTO';

import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { User_SearchOutputDTO } from 'src/app/core/dtos/output/users/User_SearchOutputDTO';
import * as automapper from 'automapper-ts';
import { User_GetByIdOutputDTO } from 'src/app/core/dtos/output/users/User_GetByIdOutputDTO';
import { User_UpdateInputDTO } from 'src/app/core/dtos/input/users/User_UpdateInputDTO';
import { User_GetRolesByIdOutputDTO } from 'src/app/core/dtos/output/users/User_GetRolesByIdOutputDTO';
import { Group } from 'src/app/core/models/entity/group';
import { User_InsertInputDTO } from 'src/app/core/dtos/input/users/User_InsertInputDTO';
import { Permission, permission } from 'src/app/core/enum/permission';

@Injectable({
    providedIn: 'root'
  })

export class AdminUsersWebDataService implements AdminUsersDataService {

  private paging_batch_size: number = 25;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private httpClient: HttpClient) { }

  getUsers(name:string, groupid:number): Observable<User[]> {

    var request = new User_SearchInputDTO()
    request.Name = name;
    request.GroupId = groupid;

    var requestUri = environment.api.baseUrl + `/v1/users`;

    console.log('AdminUsersWebDataService - getUsers - requestUrl ', requestUri);

    const options = {
      params: new HttpParams()
    };
    if(request) {
      if (request.Name) {
        options.params = options.params.set('name', request.Name);
      }
      if (request.GroupId) {
        options.params = options.params.set('roleId', request.GroupId.toString());
      }
    }

    return this.httpClient.get<User_SearchOutputDTO[]>(requestUri, options).pipe(map(
      response => {
        automapper
          .createMap(response, User)
          .forMember('userId', function(opts) { opts.mapFrom('userId'); })
          .forMember('userName', function(opts) { opts.mapFrom('userName'); })
          .forMember('emailAddress', function(opts) { opts.mapFrom('emailAddress'); })
          .forMember('firstName', function(opts) { opts.mapFrom('firstName'); })
          .forMember('lastName', function(opts) { opts.mapFrom('lastName'); })
          .forMember('displayName', function(opts) { opts.mapFrom('displayName'); })
          .forMember('roleNames', function(opts) { opts.mapFrom('roleNames'); })
          .forMember('status', function(opts) { opts.mapFrom('status'); })
          .forMember('statusName', function(opts) { opts.mapFrom('statusName'); })
          .forMember('createdOn', function(opts) { opts.mapFrom('createdOn'); })
          .forMember('createdBy', function(opts) { opts.mapFrom('createdBy'); })
          .forMember('modifiedOn', function(opts) { opts.mapFrom('modifiedOn'); })
          .forMember('modifiedBy', function(opts) { opts.mapFrom('modifiedBy'); })

        var _response = automapper.map(response, User, response);
        console.log('AdminUsersWebDataService - getUsers: ', _response);
        return this.setUsers(_response);
      }),
      catchError(e => {
        console.log("'AdminUsersWebDataService - getUsers error:", e);
        return of(null);
      })
    );
  }

  setUsers(users: User[]) {
    users.forEach(user => {
      if (user.roleNames) {
        var roles = user.roleNames.split(",");
        const rolesLength = roles.length;
        user.roleNames = rolesLength > 1 ? `${roles[0]} +${rolesLength - 1}` : roles[0];
      }
    });
    return users;
  }

  getUser(id: number): Observable<User> {
    var requestUri = environment.api.baseUrl + `/v1/users/${id}`;

    return this.httpClient.get<User_GetByIdOutputDTO[]>(requestUri).pipe(map(response =>{
      automapper
        .createMap(response, User)
        .forMember('userId', function (opts) { opts.mapFrom('userId'); })
        .forMember('userName', function (opts) { opts.mapFrom('userName'); })
        .forMember('emailAddress', function (opts) { opts.mapFrom('emailAddress'); })
        .forMember('firstName', function (opts) { opts.mapFrom('firstName'); })
        .forMember('lastName', function (opts) { opts.mapFrom('lastName'); })
        .forMember('displayName', function (opts) { opts.mapFrom('displayName'); })
        .forMember('roleNames', function (opts) { opts.mapFrom('roleNames'); })
        .forMember('status', function (opts) { opts.mapFrom('status'); })
        .forMember('statusName', function (opts) { opts.mapFrom('statusName'); })
        .forMember('createdOn', function (opts) { opts.mapFrom('createdOn'); })
        .forMember('createdBy', function (opts) { opts.mapFrom('createdBy'); })
        .forMember('modifiedOn', function (opts) { opts.mapFrom('modifiedOn'); })
        .forMember('modifiedBy', function (opts) { opts.mapFrom('modifiedBy'); })

      var _response = automapper.map(response, User, response);
      console.log('AdminUsersWebDataService - getUser: ', _response);
      return _response;

    }), catchError(e => {
      console.log("'AdminUsersWebDataService - getUser error:", e);
      return of(null);
    })
    );
  }

  createUser(payload: User) {
    var requestUri = environment.api.baseUrl + `/v1/users`;

    automapper
      .createMap(payload, User_InsertInputDTO)
      .forMember('userName', function (opts) { opts.mapFrom('UserName'); })
      .forMember('emailAddress', function (opts) { opts.mapFrom('EmailAddress'); })
      .forMember('firstName', function (opts) { opts.mapFrom('FirstName'); })
      .forMember('lastName', function (opts) { opts.mapFrom('LastName'); })
      .forMember('userId', function (opts) { opts.mapFrom('UserId'); })
      .forMember('displayName', function (opts) { opts.mapFrom('DisplayName'); })

    var request = automapper.map(payload, User_InsertInputDTO, payload);
    console.log('AdminUsersWebDataService - createUser: ', request);

    return this.httpClient.post(requestUri, request).pipe(map(response =>{
      automapper
        .createMap(response, User)
        .forMember('userId', function (opts) { opts.mapFrom('userId'); })
        .forMember('userName', function (opts) { opts.mapFrom('userName'); })
        .forMember('emailAddress', function (opts) { opts.mapFrom('emailAddress'); })
        .forMember('firstName', function (opts) { opts.mapFrom('firstName'); })
        .forMember('lastName', function (opts) { opts.mapFrom('lastName'); })
        .forMember('displayName', function (opts) { opts.mapFrom('displayName'); })
        .forMember('roleNames', function (opts) { opts.mapFrom('roleNames'); })
        .forMember('status', function (opts) { opts.mapFrom('status'); })
        .forMember('statusName', function (opts) { opts.mapFrom('statusName'); })
        .forMember('createdOn', function (opts) { opts.mapFrom('createdOn'); })
        .forMember('createdBy', function (opts) { opts.mapFrom('createdBy'); })
        .forMember('modifiedOn', function (opts) { opts.mapFrom('modifiedOn'); })
        .forMember('modifiedBy', function (opts) { opts.mapFrom('modifiedBy'); })

      var _response = automapper.map(response, User, response);
      console.log('AdminUsersWebDataService - createUser response: ', _response);
      return _response;
    }), catchError(e => {
        console.log('AdminUsersWebDataService - createUser error: ', e);
        return of(null);
      })
    );
  }

  updateUser(id: number, payload: User) {
    var requestUri = environment.api.baseUrl + `/v1/users/${id}`;
    console.log('AdminUsersWebDataService - requestUri: ', requestUri);

    automapper
      .createMap(payload, User_UpdateInputDTO)
      .forMember('userId', function (opts) { opts.mapFrom('UserId'); })
      .forMember('userName', function (opts) { opts.mapFrom('UserName'); })
      .forMember('emailAddress', function (opts) { opts.mapFrom('EmailAddress'); })
      .forMember('firstName', function (opts) { opts.mapFrom('FirstName'); })
      .forMember('lastName', function (opts) { opts.mapFrom('LastName'); })
      .forMember('status', function (opts) { opts.mapFrom('Status'); })

    var request = automapper.map(payload, User_UpdateInputDTO, payload);
    console.log('AdminUsersWebDataService - updateUser: ', request);

    return this.httpClient.put(requestUri, request).pipe(map(
      response =>{
        automapper
          .createMap(response, User)
          .forMember('userId', function (opts) { opts.mapFrom('userId'); })
          .forMember('userName', function (opts) { opts.mapFrom('userName'); })
          .forMember('emailAddress', function (opts) { opts.mapFrom('emailAddress'); })
          .forMember('firstName', function (opts) { opts.mapFrom('firstName'); })
          .forMember('lastName', function (opts) { opts.mapFrom('lastName'); })
          .forMember('displayName', function (opts) { opts.mapFrom('displayName'); })
          .forMember('roleNames', function (opts) { opts.mapFrom('roleNames'); })
          .forMember('status', function (opts) { opts.mapFrom('status'); })
          .forMember('statusName', function (opts) { opts.mapFrom('statusName'); })
          .forMember('createdOn', function (opts) { opts.mapFrom('createdOn'); })
          .forMember('createdBy', function (opts) { opts.mapFrom('createdBy'); })
          .forMember('modifiedOn', function (opts) { opts.mapFrom('modifiedOn'); })
          .forMember('modifiedBy', function (opts) { opts.mapFrom('modifiedBy'); })

      var _response = automapper.map(response, User, response);
      console.log('AdminUsersWebDataService - updateUser response: ', _response);
      return _response;
    }), catchError(e => {
        console.log('AdminUsersWebDataService - updateUser error: ', e);
        return of(null);
      })
    );
  }

  updateGroups(userid: number, payload: number[], isAddRoles: boolean) {
    var requestUri = environment.api.baseUrl + `/v1/users/${userid}/roles?isAddRoles=${isAddRoles}`;

    var request = new User_InsertRoleInputDTO();
    request.RoleIds = payload;

    return this.httpClient.post(requestUri, request).pipe(
      catchError(e => {
        console.log('AdminUsersWebDataService - updateGroups error: ', e);
        return of(null);
      })
    );
  }

  getGroups(userid: number): Observable<Group[]> {
    var requestUri = environment.api.baseUrl + `/v1/users/${userid}/roles`;

    return this.httpClient.get<User_GetRolesByIdOutputDTO>(requestUri).pipe(map(groups => {
      automapper
        .createMap(groups, Group)
        .forMember('id', function (opts) { opts.mapFrom('roleId'); })
        .forMember('name', function (opts) { opts.mapFrom('roleName'); })

      var _response = automapper.map(groups, Group, groups);
      return _response;
    }));
  }
  
  getPermissions(userid: number): Observable<Permission[]> {
    var requestUri = environment.api.baseUrl + `/v1/users/${userid}/permissions`;

    var permissions: Permission[] = [];
    var perm = new Permission();
    perm.name = permission.VIEW_USERS;
    permissions.push(perm);
    var perm2 = new Permission();
    perm2.name = permission.VIEW_GROUP;
    permissions.push(perm2);
    var perm3 = new Permission();
    perm3.name = permission.VIEW_ADMIN_DASHBOARD;
    permissions.push(perm3);
    var perm4 = new Permission();
    perm4.name = permission.VIEW_GROUP_EDIT;
    permissions.push(perm4);
    var perm5 = new Permission();
    perm5.name = permission.VIEW_USERS_EDIT;
    permissions.push(perm5);

    return of(permissions);


    // return this.httpClient.get<User_GetRolesByIdOutputDTO>(requestUri).pipe(map(permissions => {
    //   automapper
    //     .createMap(permissions, Permission)
    //     .forMember('id', function (opts) { opts.mapFrom('id'); })
    //     .forMember('name', function (opts) { opts.mapFrom('name'); })
    //     .forMember('status', function (opts) { opts.mapFrom('status'); })

    //   var _response = automapper.map(permissions, Permission, permissions);
    //   return _response;
    // }));
  }
}
