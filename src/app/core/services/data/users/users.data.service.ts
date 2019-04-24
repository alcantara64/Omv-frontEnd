import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/entity/user';

@Injectable({
  providedIn: 'root'
})
export abstract class UsersDataService {

  constructor() { }

  abstract getLoggedInUser(): Observable<User>;
}