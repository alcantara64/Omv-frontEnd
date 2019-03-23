import { UserItem } from './../../../models/user.item';
import { User } from './../../../models/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export abstract class AdminUsersDataService {

    constructor() { }

    abstract getUsers(): Observable<User[]>;
    abstract getUser(id: number): Observable<UserItem>;
    abstract deleteUser(id: number, payload: User);
    abstract disableUser(id: number, payload: User);
    abstract enableUser(id: number, payload: User);
    abstract updateUser(id: number, payload: User);
    abstract assignToGroups(userid: number, payload: number[]);
    abstract getGroupsByUserId(userid: number);
}
