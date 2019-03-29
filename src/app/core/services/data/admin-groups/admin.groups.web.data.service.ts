import { Role_InsertInputDTO } from './../../../dtos/input/roles/Role_InsertInputDTO';
import { Role_GetAllOutputDTO } from './../../../dtos/output/roles/Role_GetAllOutputDTO';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { User } from "src/app/core/models/entity/user";
import { AdminGroupsDataService } from "./admin-groups.data.service";
import { Group } from "src/app/core/models/entity/group";
import { environment } from "src/environments/environment";
import { catchError, map } from "rxjs/operators";
import { Permission } from 'src/app/core/enum/permission';
import * as automapper from 'automapper-ts';
import { Role_UpdateInputDTO } from 'src/app/core/dtos/input/roles/Role_UpdateInputDTO';
import { Role_GetPermissionsByIdOutputDTO } from 'src/app/core/dtos/output/roles/Role_GetPermissionsByIdOutputDTO';
import { Role_InsertPermissionInputDTO } from 'src/app/core/dtos/input/roles/Role_InsertPermissionInputDTO';
import { Role_GetMembersByIdOutputDTO } from 'src/app/core/dtos/output/roles/Role_GetMembersByIdOutputDTO';
import { Role_InsertMembersInputDTO } from 'src/app/core/dtos/input/roles/Role_InsertMembersInputDTO';

@Injectable({
  providedIn: "root"
})
export class AdminGroupsWebDataService implements AdminGroupsDataService {
  private requestUri = environment.api.baseUrl + `/v1/roles`;
  private paging_batch_size: number = 25;

  httpOptions = {
    headers: new HttpHeaders({
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "-1"
    })
  };

  constructor(private httpClient: HttpClient) { }

  getGroups(): Observable<Group[]> {
    var requestUri = environment.api.baseUrl + `/v1/roles`;


    return this.httpClient.get<Role_GetAllOutputDTO[]>(requestUri).pipe(map(
      response => {
        automapper
          .createMap(Role_GetAllOutputDTO, Group)
          .forMember('id', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('roleId'))
          .forMember('name', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('roleName'))
          .forMember('memberCount', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('memberCount'))
          .forMember('isSystem', function (opts) { opts.mapFrom('isSystem'); })
          .forMember('status', function (opts) { opts.mapFrom('status'); })


          .forMember('createdOn', function (opts) { opts.mapFrom('createdOn'); })
          .forMember('createdBy', function (opts) { opts.mapFrom('createdBy'); })
          .forMember('modifiedOn', function (opts) { opts.mapFrom('modifiedOn'); })
          .forMember('modifiedBy', function (opts) { opts.mapFrom('modifiedBy'); })

        var _response = automapper.map(Role_GetAllOutputDTO, Group, response);
        console.log('AdminGroupsWebDataService - getGroups: ', _response);
        return _response;

      }),
      catchError(e => {
        console.log("AdminGroupsWebDataService - getGroups error: ", e);
        return of(null);
      })
    );
  }

  getGroup(id: number): Observable<Group> {
    var requestUri = environment.api.baseUrl + `/v1/roles/${id}`;

    return this.httpClient.get<Role_GetAllOutputDTO[]>(requestUri).pipe(map(
      response => {
        automapper
          .createMap(Role_GetAllOutputDTO, Group)
          .forMember('id', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('roleId'))
          .forMember('name', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('roleName'))
          .forMember('memberCount', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('memberCount'))
          .forMember('isSystem', function (opts) { opts.mapFrom('isSystem'); })
          .forMember('status', function (opts) { opts.mapFrom('status'); })


          .forMember('createdOn', function (opts) { opts.mapFrom('createdOn'); })
          .forMember('createdBy', function (opts) { opts.mapFrom('createdBy'); })
          .forMember('modifiedOn', function (opts) { opts.mapFrom('modifiedOn'); })
          .forMember('modifiedBy', function (opts) { opts.mapFrom('modifiedBy'); })

        var _response = automapper.map(Role_GetAllOutputDTO, Group, response);
        console.log('AdminGroupsWebDataService - getGroup: ', _response);
        return _response;

      }),
      catchError(e => {
        console.log("AdminGroupsWebDataService - getGroup error:", e);
        return of(null);
      })
    );
  }

  createGroup(payload: Group): Observable<Group> {
    var requestUri = environment.api.baseUrl + `/v1/roles`;

    automapper
      .createMap(payload, Role_InsertInputDTO)
      .forMember('RoleId', function (opts) { opts.mapFrom('RoleId'); })
      .forMember('RoleName', function (opts) { opts.mapFrom('RoleName'); })
      .forMember('IsSystem', function (opts) { opts.mapFrom('IsSystem'); })
      .forMember('Status', function (opts) { opts.mapFrom('Status'); })
      .forMember('Description', function (opts) { opts.mapFrom('RoleDescription'); })

    var request = automapper.map(payload, Role_InsertInputDTO, payload);
    console.log('AdminGroupsWebDataService - createGroup: ', request);

    return this.httpClient.post(requestUri, request).pipe(
      catchError(e => {
        console.log('AdminGroupsWebDataService - createUser error: ', e);
        return of(null);
      })
    );
  }



  updateGroup(id: number, payload: Group) {
    var requestUri = environment.api.baseUrl + `/v1/roles/${id}`;

    automapper
      .createMap(payload, Role_UpdateInputDTO)
      .forMember('roleName', function (opts) { opts.mapFrom('name'); })
      .forMember('isSystem', function (opts) { opts.mapFrom('isSystem'); })
      .forMember('status', function (opts) { opts.mapFrom('status'); })

    var request = automapper.map(payload, Role_UpdateInputDTO, payload);

    request.isSystem = request.isSystem.toString();
    request.roleName = request.roleName.toString();
    console.log('AdminGroupsWebDataService - updateUser: ', request);

    return this.httpClient.put(requestUri, request).pipe(
      catchError(e => {
        console.log('AdminGroupsWebDataService - updateUser error: ', e);
        return of(null);
      })
    );
  }


  getPermissions(groupId: number): Observable<Permission[]> {
    var requestUri = environment.api.baseUrl + `/v1/roles/${groupId}/permissions`;

    return this.httpClient.get<Role_GetPermissionsByIdOutputDTO[]>(requestUri).pipe(map(
      response => {
        automapper
          .createMap(Role_GetPermissionsByIdOutputDTO, Permission)
          .forMember('id', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('permissionId'))
          .forMember('name', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('permissionDescription'))
          .forMember('status', function (opts) { opts.mapFrom('status'); })


          .forMember('createdOn', function (opts) { opts.mapFrom('createdOn'); })
          .forMember('createdBy', function (opts) { opts.mapFrom('createdBy'); })
          .forMember('modifiedOn', function (opts) { opts.mapFrom('modifiedOn'); })
          .forMember('modifiedBy', function (opts) { opts.mapFrom('modifiedBy'); })

        var _response = automapper.map(Role_GetPermissionsByIdOutputDTO, Permission, response);
        console.log('AdminGroupsWebDataService - getPermissions: ', _response);
        return _response;

      }),
      catchError(e => {
        console.log("AdminGroupsWebDataService - getPermissions error:", e);
        return of(null);
      })
    );
  }
  updatePermissions(groupId: number, payload: string[]) {
    var requestUri = environment.api.baseUrl + `/v1/roles/${groupId}/permissions`;

    var request = new Role_InsertPermissionInputDTO();
    request.PermissionIds = payload;

    console.log('AdminGroupsWebDataService - updatePermissions: ', request);

    return this.httpClient.post(requestUri, request).pipe(
      catchError(e => {
        console.log('AdminGroupsWebDataService - updatePermissions error: ', e);
        return of(null);
      })
    );
  }
  getMembers(groupId: number): Observable<User[]> {
    var requestUri = environment.api.baseUrl + `/v1/roles/${groupId}/members`;

    return this.httpClient.get<Role_GetMembersByIdOutputDTO []>(requestUri).pipe(map(
      response => {
        automapper
          .createMap(Role_GetMembersByIdOutputDTO , User)
          .forMember('id', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('userId'));


        var _response = automapper.map(Role_GetMembersByIdOutputDTO , User, response);
        console.log('AdminGroupsWebDataService - getMembers: ', response);

        return _response;

      }),
      catchError(e => {
        console.log("AdminGroupsWebDataService - getMembers error:", e);
        return of(null);
      })
    );
  }

  addMembers(groupId: number, payload: number[]) {
    var requestUri = environment.api.baseUrl + `/v1/roles/${groupId}/members`;

    var request = new Role_InsertMembersInputDTO();
    request.UserIds = payload;

    console.log('AdminGroupsWebDataService - addMembers: ', request);

    return this.httpClient.post(requestUri, request).pipe(
      catchError(e => {
        console.log('AdminGroupsWebDataService - addMembers error: ', e);
        return of(null);
      })
    );
  }
  removeMembers(groupId: number, payload: number[]) {
    throw new Error("Method not implemented.");
  }
}
