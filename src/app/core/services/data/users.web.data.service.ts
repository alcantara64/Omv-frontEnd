import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersDataService } from './users.data.service';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })

export class UsersWebDataService implements UsersDataService {
     
  private paging_batch_size:number = 25;
  
  constructor(private httpClient: HttpClient) { }

  getAdminUsers(status: number): Observable<any> {
    throw new Error("Method not implemented.");
  }
}