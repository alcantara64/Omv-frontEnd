import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AdminUsersDataService } from './admin-users.data.service';
import { User } from 'src/app/core/models/User';
import { User_SearchInputDTO } from 'src/app/core/dtos/user-search-input.dto';
import { User_SearchOutputDTO } from 'src/app/core/dtos/user-search-output.dto';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
  })

export class AdminUsersWebDataService implements AdminUsersDataService {

  private paging_batch_size:number = 25;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private httpClient: HttpClient) { }

  getUsers(request: User_SearchInputDTO): Observable<User_SearchOutputDTO[]> {
    var requestUri = environment.api.baseUrl + `/v1/users`;

    const options = {
      params: new HttpParams()
    };
    if(request) {
      if (request.Name) {
        options.params = options.params.set('name', request.Name);
      }
    }

    return this.httpClient.get<User_SearchOutputDTO[]>(requestUri, options).pipe(map(response => response),
      catchError(e => {
        console.log("error trying to retrieve users ", e);
        return of(null);
      })
    );
  }

  getUser(id: number): Observable<User> {
    return null;
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
