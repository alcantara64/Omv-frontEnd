import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/entity/user';
import { UsersDataService } from './users.data.service';

@Injectable({
  providedIn: 'root'
})
export class UsersMockDataService implements UsersDataService {

  constructor() { }

  getLoggedInUser(): Observable<User> {
    return null;
  }
}