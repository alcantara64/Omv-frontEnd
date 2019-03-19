import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminUsersDataService } from './admin-users.data.service';


@Injectable({
    providedIn: 'root'
  })

export class AdminUsersWebDataService implements AdminUsersDataService {
     
  private paging_batch_size:number = 25;
  
  constructor(private httpClient: HttpClient) { }

  getAdminUsers(status: number): Observable<any> {
    throw new Error("Method not implemented.");
  }
}