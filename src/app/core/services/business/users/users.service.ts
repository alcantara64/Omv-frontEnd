import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/entity/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private usersDataService) { }

  getLoggedInUser(): Observable<User> {
    return this.usersDataService.getLoggedInUser();
  }
}
