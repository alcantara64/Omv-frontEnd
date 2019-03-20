import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/User';
import { AdminUsersDataService } from './admin-users.data.service';
import { map } from 'rxjs/operators';
import { AdminUserStatus } from 'src/app/core/enum/admin-user-status';
import { select } from '@ngrx/store';


@Injectable({
    providedIn: 'root'
  })

export class AdminUsersMockDataService implements AdminUsersDataService {
 
    
  private paging_batch_size:number = 25;
  private mockCRUDurl: string = 'https://endaebqexdz78.x.pipedream.net';
  private mockUrl = `./assets/mock/admin-users.json`;
  constructor(private httpClient: HttpClient) { }

  getActiveAdminUsers(): Observable<User[]> {
    var mockUrl = `./assets/mock/admin-users.json`;
    var data = this.httpClient.get<User[]>(mockUrl).pipe(select(response => {
      return response.filter(x => x.status === AdminUserStatus.Active)
    }));    

    return data;
  }

  getDisabledAdminUsers(): Observable<User[]> {
    var mockUrl = `./assets/mock/admin-users.json`;
    var data = this.httpClient.get<User[]>(mockUrl).pipe(select(response => {
      return response.filter(x => x.status === AdminUserStatus.Disabled)
    }));    

    return data;
  }

  getUnassignedAdminUsers(): Observable<User[]> {
    var mockUrl = `./assets/mock/admin-users.json`;
    var data = this.httpClient.get<User[]>(mockUrl).pipe(select(response => {
      return response.filter(x => !x.isAssigned)
    }));

    return data;
  }

  deleteActiveAdminUsers(payload) {
    return this.httpClient.delete(this.mockUrl, payload);
  }
}