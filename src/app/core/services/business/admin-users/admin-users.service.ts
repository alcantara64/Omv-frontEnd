import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../../models/User';
import { AdminUsersDataService } from '../../data/admin-users/admin-users.data.service';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {

  constructor(private UsersDataService: AdminUsersDataService) { }

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
