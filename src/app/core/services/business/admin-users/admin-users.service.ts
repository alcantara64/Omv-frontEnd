import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../../models/User';
import { AdminUsersDataService } from '../../data/admin-users/admin-users.data.service';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {

  constructor(private AdminUsersDataService: AdminUsersDataService) { }

  getUsers(): Observable<User[]> {
    return this.AdminUsersDataService.getUsers();
  }
}
