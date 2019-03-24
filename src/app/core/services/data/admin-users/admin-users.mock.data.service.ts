import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminUsersDataService } from './admin-users.data.service';
import { map } from 'rxjs/operators';
import { AdminUserStatus } from 'src/app/core/enum/admin-user-status';
import { User } from 'src/app/core/models/user';


@Injectable({
    providedIn: 'root'
  })

export class AdminUsersMockDataService implements AdminUsersDataService {

  private paging_batch_size:number = 25;
  private mockCRUDurl: string = 'https://omvclient.free.beeceptor.com';
  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    var mockUrl = `./assets/mock/admin-users.json`;
    var data = this.httpClient.get<User[]>(mockUrl);

    return data;
  }

  getUser(id: number): Observable<User> {
    var mockUrl = `./assets/mock/admin-users.json`;
    var data = this.httpClient.get<User[]>(mockUrl).pipe(map(users => {
      return users.find(user => user.id === id);
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

  createUser(payload: User): Observable<User> {
    var mockUrl = `./assets/mock/admin-users.json`;
    return this.httpClient.get<User>(mockUrl).pipe(map(user => {
      var _user = new User();
      _user.id = 3;
      return _user;
    }));
  }

  updateUser(id: number, payload: User) {
    var mockUrl = `./assets/mock/admin-users.json`;
    return this.httpClient.get<User[]>(mockUrl).pipe(map(users => {
      return users.find(user => user.id === id);
    }));    
  }

  assignToGroups(userid: number, payload: number[]) {
    var mockUrl = `./assets/mock/admin-users.json`;
    return this.httpClient.put<any>(mockUrl, payload);
  }
}
