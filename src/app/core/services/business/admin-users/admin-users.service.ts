import { User_SearchInputDTO } from '../../../dtos/input/users/User_SearchInputDTO';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../../models/entity/user';
import { AdminUsersDataService } from '../../data/admin-users/admin-users.data.service';
import { Group } from 'src/app/core/models/entity/group';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {

  constructor(private AdminUserService: AdminUsersDataService) { }

  getUsers(name: string, groupId: number): Observable<User[]> {
    return this.AdminUserService.getUsers(name, groupId);
  }

  getUser(id: number): Observable<User> {
    return this.AdminUserService.getUser(id);
  }



  createUser(payload: User) {
    return this.AdminUserService.createUser(payload);
  }

  updateUser(id: number, payload: User)  {
    return this.AdminUserService.updateUser(id, payload);
  }

  updateGroups(userid: number, payload: number[], isAddRoles:boolean) {
    return this.AdminUserService.updateGroups(userid, payload, isAddRoles);
  }

  getGroups(userid: number): Observable<Group[]> {
    return this.AdminUserService.getGroups(userid);
  }
}
