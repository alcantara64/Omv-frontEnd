import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/User';
import { AdminUsersDataService } from './admin-users.data.service';
import { map } from 'rxjs/operators';
import { AdminUserStatus } from 'src/app/core/enum/admin-user-status';
import { UserItem } from 'src/app/core/models/user.item';


@Injectable({
    providedIn: 'root'
  })

export class AdminUsersMockDataService implements AdminUsersDataService {

  private paging_batch_size:number = 25;
  private mockCRUDurl: string = 'https://endaebqexdz78.x.pipedream.net';
  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    var mockUrl = `./assets/mock/admin-users.json`;
    var data = this.httpClient.get<User[]>(mockUrl);

    return data;
  }

  getUser(id: number): Observable<UserItem> {
    var mockUrl = `./assets/mock/admin-user.json`;
    var data = this.httpClient.get<UserItem>(mockUrl);

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

  updateUser(id: number, payload: User) {
    var mockUrl = `./assets/mock/admin-users.json`;
    return this.httpClient.put<any>(mockUrl, payload);
  }

  assignToGroups(userid: number, payload: number[])
  {
    var mockUrl = `./assets/mock/admin-users.json`;
    return this.httpClient.put<any>(mockUrl, payload);
  }
}
