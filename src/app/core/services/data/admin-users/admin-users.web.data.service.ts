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


@Injectable({
    providedIn: 'root'
  })

export class AdminUsersWebDataService implements AdminUsersDataService {

  private paging_batch_size:number = 25;

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

    const options = {
      params: new HttpParams()
    };
    if(request) {
      if (request.Name) {
        options.params = options.params.set('name', request.Name);
      }
    }

    return this.httpClient.get<User_SearchOutputDTO[]>(requestUri, options).pipe(map(

      response =>{
          //response
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
            return _response;

      }),
      catchError(e => {
        console.log("error trying to retrieve users ", e);
        return of(null);
      })
    );
  }

  getUser(id: number): Observable<User> {
    var requestUri = environment.api.baseUrl + `/v1/users/${id}`;

    return this.httpClient.get<User_GetByIdOutputDTO[]>(requestUri).pipe(map(

      response =>{
          //response
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
            return _response;

      }),
      catchError(e => {
        console.log("error trying to retrieve users ", e);
        return of(null);
      })
    );


  }

  disableUser(id: number, payload: User) {
    payload.status = 0;
    return this.updateUser(id, payload);
  }

  enableUser(id: number, payload: User) {
    payload.status = 1;
    return this.updateUser(id, payload);
  }

  createUser(payload: User) {
    var requestUri = environment.api.baseUrl + `/v1/users`;

    automapper
      .createMap(payload, User_UpdateInputDTO)
      .forMember('userId', function (opts) { opts.mapFrom('UserId'); })
      .forMember('userName', function (opts) { opts.mapFrom('UserName'); })
      .forMember('emailAddress', function (opts) { opts.mapFrom('EmailAddress'); })
      .forMember('firstName', function (opts) { opts.mapFrom('FirstName'); })
      .forMember('lastName', function (opts) { opts.mapFrom('LastName'); })
      .forMember('status', function (opts) { opts.mapFrom('Status'); })

    var request = automapper.map(payload, User_UpdateInputDTO, payload);
    console.log('AdminUsersWebDataService - createUser: ', request);

    return this.httpClient.post(requestUri, request).pipe(
      catchError(e => {
        console.log('AdminUsersWebDataService - createUser error: ', e);
        return of(null);
      })
    ).subscribe();

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

    return this.httpClient.put(requestUri, request).pipe(
      catchError(e => {
        console.log('AdminUsersWebDataService - updateUser error: ', e);
        return of(null);
      })
    )
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
    )


  }

  getGroups(userid: number): Observable<Group[]> {
    var requestUri = environment.api.baseUrl + `/v1/users/${userid}/roles`;

    return this.httpClient.get<User_GetRolesByIdOutputDTO>(requestUri).pipe(map(groups => {
      automapper
        .createMap(groups, Group)
        .forMember('id', function (opts) { opts.mapFrom('RoleId'); })
        .forMember('name', function (opts) { opts.mapFrom('RoleName'); })


      var _response = automapper.map(groups, Group, groups);
      console.log('AdminUsersWebDataService - getGroups: ', _response);
      return _response;
    }));
  }



}
