import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../../models/User';
import { AdminUsersDataService } from '../../data/admin-users/admin-users.data.service';
import { UserItem } from 'src/app/core/models/user.item';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {

  constructor(private AdminUsersDataService: AdminUsersDataService) { }

  getUsers(): Observable<User[]> {
    return this.AdminUsersDataService.getUsers();
  }

  getUser(id: number): Observable<UserItem> {
    return this.AdminUsersDataService.getUser(id);
  }

  disableUser(id: number, payload: User){
    return this.AdminUsersDataService.disableUser(id, payload);
  }

  deleteUser(id: number, payload: User){
    return this.AdminUsersDataService.deleteUser(id, payload);
  }

  enableUser(id: number, payload: User) {
    return this.AdminUsersDataService.enableUser(id, payload);
  }

  updateUser(id: number, payload: User) {
    return this.AdminUsersDataService.updateUser(id, payload);
  } 
}
