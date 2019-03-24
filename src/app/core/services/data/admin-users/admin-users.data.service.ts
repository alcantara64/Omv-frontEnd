import { User } from './../../../models/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export abstract class AdminUsersDataService {

    constructor() { }

    abstract getUsers(): Observable<User[]>;
    abstract getUser(id: number): Observable<User>;
    abstract deleteUser(id: number, payload: User);
    abstract disableUser(id: number, payload: User);
    abstract enableUser(id: number, payload: User);
    abstract createUser (payload: User): Observable<User>;
    abstract updateUser(id: number, payload: User);
    abstract assignToGroups(userid: number, payload: number[]);
}
