import { User_SearchInputDTO } from '../../../dtos/input/users/User_SearchInputDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminUsersDataService } from './admin-users.data.service';
import { map } from 'rxjs/operators';
import { User, Users } from 'src/app/core/models/entity/user';
import { Permission } from 'src/app/core/enum/permission';


@Injectable({
    providedIn: 'root'
  })

export class AdminUsersMockDataService implements AdminUsersDataService {

  private paging_batch_size:number = 25;
  private mockCRUDurl: string = 'https://omvclient.free.beeceptor.com';
  constructor(private httpClient: HttpClient) { }

  getUsers(name:string, groupid:number, pageNumber?: number, pageSize?: number): Observable<Users> {
    var mockUrl = `./assets/mock/admin-users.json`;
    var data = this.httpClient.get<Users>(mockUrl);

    return data;
  }

  getUser(id: number): Observable<User> {
    var mockUrl = `./assets/mock/admin-users.json`;
    var data = this.httpClient.get<User[]>(mockUrl).pipe(map(users => {
      return users.find(user => user.userId === id);
    }));

    return data;
  }

  deleteUser(id: number, payload: User) {
    var mockUrl = `./assets/mock/admin-users.json`;
    payload.status = -1;

    return this.httpClient.put<any>(mockUrl, payload);
  }

  disableUser(id: number, payload: User) {
    var mockUrl = `./assets/mock/admin-users.json`;
    payload.status = 0;

    return this.httpClient.put<any>(mockUrl, payload);
  }

  enableUser(id: number, payload: User) {
    var mockUrl = `./assets/mock/admin-users.json`;
    payload.status = 1;

    return this.httpClient.put<any>(mockUrl, payload);
  }

  createUser(payload: User) {
    var mockUrl = `./assets/mock/admin-users.json`;
    return this.httpClient.get<User>(mockUrl).pipe(map(user => {
      var _user = new User();
      _user.userId = 3;
      return _user;
    }));
  }

  updateUser(id: number, payload: User) {
    var mockUrl = `./assets/mock/admin-users.json`;
    return this.httpClient.get<User[]>(mockUrl).pipe(map(users => {
      return users.find(user => user.userId === id);
    }));
  }

  updateGroups(userid: number, payload: number[]) {
    var mockUrl = `./assets/mock/admin-users.json`;
    return this.httpClient.put<any>(mockUrl, payload);
  }

  getGroups(userid: number) {
    var mockUrl = `./assets/mock/admin-users.json`;
    var data = this.httpClient.get<User>(mockUrl);

    return data;
  }

  saveUserGroups(userId: number, groups: number[]) {
    var mockUrl = `./assets/mock/admin-users.json`;
    return this.httpClient.get<User>(mockUrl);
  }
  
  getPermissions(userid: number): Observable<Permission[]> {
    throw new Error("Method not implemented.");
  }
}
