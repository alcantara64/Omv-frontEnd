import { getActiveUsers } from './../../../admin/admin-users/state/admin-users.reducer';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UsersDataService } from '../data/users.data.service';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private UsersDataService: UsersDataService) { }

  getActiveUsers(): Observable<User[]> {
    return this.getUsersByStatus(0);
  }

  private getUsersByStatus(status: number): Observable<User[]> {
    console.log('getUsersByStatus: ', status);

    switch (status) {
      case 0:
        return this.UsersDataService.getAdminUsers(0);
      case 1:
        return this.UsersDataService.getAdminUsers(1);
      case 2:
        return this.UsersDataService.getAdminUsers(2);
      default:
       return null;
    }
  }
}
