import { User_SearchInputDTO } from './../../../dtos/user-search-input.dto';
import { User_SearchOutputDTO } from './../../../dtos/user-search-output.dto';
import { User } from './../../../models/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export abstract class AdminUsersDataService {

    constructor() { }

    abstract getUsers(request: User_SearchInputDTO): Observable<User_SearchOutputDTO[]>;
    abstract getUser(id: number): Observable<User>;
    abstract deleteUser(id: number, payload: User);
    abstract disableUser(id: number, payload: User);
    abstract enableUser(id: number, payload: User);
    abstract createUser (payload: User): Observable<User>;
    abstract updateUser(id: number, payload: User);
    abstract assignToGroups(userid: number, payload: number[]);
    abstract getGroupsByUserId(userid: number);
    abstract saveUserGroups(userId: number, groups: number[]);
}
