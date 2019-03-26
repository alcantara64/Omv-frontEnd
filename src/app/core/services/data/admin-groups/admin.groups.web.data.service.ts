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
import 'automapper-ts';

@Injectable({
  providedIn: "root"
})
export class AdminGroupsWebDataService implements AdminGroupsDataService {
  private paging_batch_size: number = 25;

  httpOptions = {
    headers: new HttpHeaders({
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "-1"
    })
  };

  constructor(private httpClient: HttpClient) {}

  getGroups(): Observable<Group[]> {
    var requestUri = environment.api.baseUrl + `/v1/roles`;
    console.log("trade item endpoint", requestUri);

    return this.httpClient.get<Role_GetAllOutputDTO[]>(requestUri).pipe(map(
            response =>{
                automapper
                  .createMap(Role_GetAllOutputDTO, Group)
                  .forMember('id', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('roleId'))
                  .forMember('name', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('roleName'))
                  .forMember('isSystem', function(opts) { opts.mapFrom('isSystem'); })
                   .forMember('status', function(opts) { opts.mapFrom('status'); })


                 .forMember('createdOn', function(opts) { opts.mapFrom('createdOn'); })
                  .forMember('createdBy', function(opts) { opts.mapFrom('createdBy'); })
                  .forMember('modifiedOn', function(opts) { opts.mapFrom('modifiedOn'); })
                  .forMember('modifiedBy', function(opts) { opts.mapFrom('modifiedBy'); })

                  var _response = automapper.map(Role_GetAllOutputDTO, Group, response);
                  console.log('AdminGroupsWebDataService - getGroups: ', _response);
                  return _response;

            }),
            catchError(e => {
              console.log("error trying to retrieve users ", e);
              return of(null);
            })
          );
  }
  getGroup(id: number): Observable<Group> {
    return null;
  }
  createGroup(payload: Group): Observable<Group> {
    throw new Error("Method not implemented.");
  }
  disableGroup(id: number, payload: Group) {
    throw new Error("Method not implemented.");
  }
  enableGroup(id: number, payload: Group) {
    throw new Error("Method not implemented.");
  }
  updateGroup(id: number, payload: Group) {
    throw new Error("Method not implemented.");
  }
  assignToGroups(groupId: number, payload: number[]) {
    throw new Error("Method not implemented.");
  }

  getPermissions(groupId: number): Observable<Permission[]> {
    throw new Error("Method not implemented.");
  }
  updatePermissions(groupId: number, payload: number[]) {
    throw new Error("Method not implemented.");
  }
  getMembers(groupId: number): Observable<User[]> {
    throw new Error("Method not implemented.");
  }
  addMembers(groupId: number, payload: number[]) {
    throw new Error("Method not implemented.");
  }
  removeMembers(groupId: number, payload: number[]) {
    throw new Error("Method not implemented.");
  }
}
