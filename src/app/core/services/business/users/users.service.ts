import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/entity/user';
import { UsersDataService } from '../../data/users/users.data.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private usersDataService: UsersDataService) { }

  getLoggedInUser(): Observable<User> {
    return this.usersDataService.getLoggedInUser();
  }
}
