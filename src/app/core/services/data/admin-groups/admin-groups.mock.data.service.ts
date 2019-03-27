import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminGroupsDataService } from "./admin-groups.data.service";
import { Observable } from "rxjs";
import { Group } from "src/app/core/models/entity/group";
import { map } from 'rxjs/operators';
import { User } from 'src/app/core/models/entity/user';
import { Permission } from 'src/app/core/enum/permission';

@Injectable({
  providedIn: "root"
})
export class AdminGroupsMockDataService implements AdminGroupsDataService {

  mockUrl = `./assets/mock/admin-groups.json`;
  constructor(private httpClient: HttpClient) {}

  getGroups(): Observable<Group[]> {
    return this.httpClient.get<Group[]>(this.mockUrl);
  }

  getGroup(id: number): Observable<Group> {
    var mockUrl = `./assets/mock/admin-groups.json`;
    return this.httpClient.get<Group>(mockUrl);
    // return this.httpClient.get<Group[]>(mockUrl).pipe(map(groups => {
    //   return groups.find(group => group.id === id);
    // }));
  }

  createGroup(payload: Group): Observable<Group> {
    var mockUrl = `./assets/mock/admin-groups.json`;
    var data = this.httpClient.get<Group[]>(mockUrl).pipe(map(group => {
      var _group = new Group();

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
    return this.httpClient.get<Group[]>(mockUrl);
    // return this.httpClient.get<Group[]>(mockUrl).pipe(map(groups => {
    //   return groups.find(group => group.id === id);
    // }));
  }

  assignToGroups(groupId: number, payload: number[]) {
    return this.httpClient.put<any>(`${this.mockUrl}`, payload);
  }

  getPermissions(groupId: number): Observable<string[]> {
    return this.httpClient.get<any>(`${this.mockUrl}`);
  }

  updatePermissions(groupId: number, payload: string[]) {
    var mockUrl = `./assets/mock/admin-groups.json`;
    return this.httpClient.get<Group[]>(mockUrl).pipe(map(permissions => {

    }));
  }

  getMembers(groupId: number): Observable<number[]> {
    var mockUrl = `./assets/mock/admin-users.json`;
    var d:Observable<number[]> = new Observable<number[]>()[1];
    return d;

  }

  addMembers(groupId: number, payload: number[]) {
    var mockUrl = `./assets/mock/admin-groups.json`;
    return this.httpClient.get<Group[]>(mockUrl).pipe(map(permissions => {

    }));
  }

  removeMembers(groupId: number, payload: number[]) {
    var mockUrl = `./assets/mock/admin-groups.json`;
    return this.httpClient.get<Group[]>(mockUrl).pipe(map(permissions => {

    }));
  }
}
