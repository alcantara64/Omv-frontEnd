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

  getActiveAdminUsers(): Observable<User[]> {
    throw new Error("Method not implemented.");
  }
  getDisabledAdminUsers(): Observable<User[]> {
    throw new Error("Method not implemented.");
  }
  getUnassignedAdminUsers(): Observable<User[]> {
    throw new Error("Method not implemented.");
  }
}