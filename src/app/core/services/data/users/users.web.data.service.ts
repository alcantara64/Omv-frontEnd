import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { User } from 'src/app/core/models/entity/user';
import { UsersDataService } from './users.data.service';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User_GetByIdOutputDTO } from 'src/app/core/dtos/output/users/User_GetByIdOutputDTO';

@Injectable({
  providedIn: 'root'
})
export class UsersWebDataService implements UsersDataService {

  constructor(private httpClient: HttpClient) { }

  getLoggedInUser(): Observable<User> {
    var requestUri = environment.api.baseUrl + `/v1/users/username`;

    return this.httpClient.get<User_GetByIdOutputDTO>(requestUri).pipe(
      map(response => {
        automapper
          .createMap(User_GetByIdOutputDTO, User)
          .forMember('userId', function (opts) { opts.mapFrom('userId'); })
          .forMember('userName', function (opts) { opts.mapFrom('userName'); })
          .forMember('emailAddress', function (opts) { opts.mapFrom('emailAddress'); })
          .forMember('firstName', function (opts) { opts.mapFrom('firstName'); })
          .forMember('lastName', function (opts) { opts.mapFrom('lastName'); })
          .forMember('displayName', function (opts) { opts.mapFrom('displayName'); })
          .forMember('roleNames', function (opts) { opts.mapFrom('roleNames'); })
          .forMember('status', function (opts) { opts.mapFrom('status'); })
          .forMember('statusName', function (opts) { opts.mapFrom('statusName'); })
          .forMember('createdOn', function (opts) { opts.mapFrom('createdOn'); })
          .forMember('createdBy', function (opts) { opts.mapFrom('createdBy'); })
          .forMember('modifiedOn', function (opts) { opts.mapFrom('modifiedOn'); })
          .forMember('modifiedBy', function (opts) { opts.mapFrom('modifiedBy'); })

        var user = automapper.map(User_GetByIdOutputDTO, User, response);
        console.log('UsersWebDataService - getLoggedInUser: ', user);
        return user;
      })
    );
  }
}