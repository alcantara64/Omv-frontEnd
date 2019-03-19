import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersDataService } from './users.data.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/User';


@Injectable({
    providedIn: 'root'
  })

export class UsersMockDataService implements UsersDataService {
    
  private paging_batch_size:number = 25;
  private mockCRUDurl: string = 'https://endaebqexdz78.x.pipedream.net';
  
  constructor(private httpClient: HttpClient) { }

  getAdminUsers(status: number): Observable<User[]> {
    var mockUrl = `./assets/mock/users.json`;
    var data = this.httpClient.get<any>(mockUrl);

    return data;
  }
}