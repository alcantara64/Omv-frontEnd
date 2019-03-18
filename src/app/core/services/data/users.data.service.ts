import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/User';

@Injectable({
    providedIn: 'root'
})
export abstract class UsersDataService {
    abstract getAdminUsers(status: number): Observable<User[]>;

    constructor() { }
}