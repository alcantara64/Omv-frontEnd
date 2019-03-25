import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminUsersDataService } from './admin-users.data.service';
import { User } from 'src/app/core/models/User';


@Injectable({
    providedIn: 'root'
  })

export class AdminUsersWebDataService implements AdminUsersDataService {

  private paging_batch_size:number = 25;

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    throw new Error("Method not implemented.");
  }

  getUser(id: number): Observable<User> {
    throw new Error("Method not implemented.");
  }

  deleteUser(id: number, payload: User) {
    throw new Error("Method not implemented.");
  }

  disableUser(id: number, payload: User) {
    throw new Error("Method not implemented.");
  }

  enableUser(id: number, payload: User) {
    throw new Error("Method not implemented.");
  }

  createUser(payload: User): Observable<User> {
    throw new Error("Method not implemented.");
  }

  updateUser(id: number, payload: User) {
    throw new Error("Method not implemented.");
  }

  assignToGroups(userid: number, payload: number[])
  {
    throw new Error("Method not implemented.");
  }
  
  getGroupsByUserId(userid: number) {
    throw new Error("Method not implemented.");
  }
  
  saveUserGroups(userId: number, groups: number[]) {
    throw new Error("Method not implemented.");
  }

}
