import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../../models/User';
import { AdminUsersDataService } from '../../data/admin-users/admin-users.data.service';
import { Group } from 'src/app/core/models/group';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {

  constructor(private AdminUserService: AdminUsersDataService) { }

  getUsers(): Observable<User[]> {
    return this.AdminUserService.getUsers();
  }

  getUser(id: number): Observable<User> {
    return this.AdminUserService.getUser(id);
  }

  disableUser(id: number, payload: User) {
    return this.AdminUserService.disableUser(id, payload);
  }

  deleteUser(id: number, payload: User) {
    return this.AdminUserService.deleteUser(id, payload);
  }

  enableUser(id: number, payload: User) {
    return this.AdminUserService.enableUser(id, payload);
  }

  createUser(payload: User): Observable<User> {
    return this.AdminUserService.createUser(payload);
  }

  updateUser(id: number, payload: User) {
    return this.AdminUserService.updateUser(id, payload);
  }

  assignToGroups(userid: number, payload: number[]) {
    return this.AdminUserService.assignToGroups(userid, payload);
  }

  getGroupsByUserId(userid: number): Observable<Group[]> {
    return this.AdminUserService.getGroupsByUserId(userid);
  }

  saveUserGroups(userId: number, groups: number[]) {
    return this.AdminUserService.saveUserGroups(userId, groups);
  }
}
