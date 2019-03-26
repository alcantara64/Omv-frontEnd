import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminGroupsDataService } from "./admin-groups.data.service";
import { Observable } from "rxjs";
import { Group } from "src/app/core/models/group";
import { map } from 'rxjs/operators';
import { User } from 'src/app/core/models/user';
import { Role_GetAllOutputDTO } from 'src/app/core/dtos/role-get-all-output.dto';
import { Permission } from 'src/app/core/enum/permission';

@Injectable({
  providedIn: "root"
})
export class AdminGroupsMockDataService implements AdminGroupsDataService {

  mockUrl = `./assets/mock/admin-groups.json`;
  constructor(private httpClient: HttpClient) {}

  getGroups(): Observable<Role_GetAllOutputDTO[]> {
    return this.httpClient.get<Role_GetAllOutputDTO[]>(this.mockUrl);
  }

  getGroup(id: number): Observable<Group> {
    var mockUrl = `./assets/mock/admin-groups.json`;
    return this.httpClient.get<Group[]>(mockUrl).pipe(map(groups => {
      return groups.find(group => group.id === id);
    }));
  }

  createGroup(payload: Group): Observable<Group> {
    var mockUrl = `./assets/mock/admin-groups.json`;
    var data = this.httpClient.get<Group[]>(mockUrl).pipe(map(group => {
      var _group = new Group();
      _group.id = 3;
      return _group;
    }));
    return data;
  }

  disableGroup(id: number, payload: Group) {
    payload.status = 0;
    return this.httpClient.put<any>(`${this.mockUrl}`, payload);
  }
  
  enableGroup(id: number, payload: Group) {
    payload.status = 1;
    return this.httpClient.put<any>(`${this.mockUrl}`, payload);
  }
  
  updateGroup(id: number, payload: Group) {
    var mockUrl = `./assets/mock/admin-groups.json`;
    return this.httpClient.get<Group[]>(mockUrl).pipe(map(groups => {
      return groups.find(group => group.id === id);
    }));    
  }

  assignToGroups(groupId: number, payload: number[]) {
    return this.httpClient.put<any>(`${this.mockUrl}`, payload);
  }

  getGroupPermissions(groupId: number): Observable<Permission[]> {
    return this.httpClient.get<any>(`${this.mockUrl}`);
  }

  updateGroupPermissions(groupId: number, payload: number[]) {
    var mockUrl = `./assets/mock/admin-groups.json`;
    return this.httpClient.get<Group[]>(mockUrl).pipe(map(permissions => {
      
    }));   
  }

  getGroupMembers(groupId: number): Observable<User[]> {
    var mockUrl = `./assets/mock/admin-users.json`;
    return this.httpClient.get<User[]>(mockUrl).pipe(map(users => {
      return users.filter(x => x.id === 1 || x.id === 4);
    }));
  }

  addGroupMembers(groupId: number, payload: number[]) {
    var mockUrl = `./assets/mock/admin-groups.json`;
    return this.httpClient.get<Group[]>(mockUrl).pipe(map(permissions => {
      
    }));   
  }

  removeGroupMembers(groupId: number, payload: number[]) {
    var mockUrl = `./assets/mock/admin-groups.json`;
    return this.httpClient.get<Group[]>(mockUrl).pipe(map(permissions => {
      
    }));   
  }
}
