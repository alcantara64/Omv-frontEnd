import { Permission } from 'src/app/core/enum/permission';
import { User, Users } from '../../../models/entity/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export abstract class AdminUsersDataService {

    constructor() { }

    abstract getUsers(name:string, groupid:number, pageNumber?: number, pageSize?: number): Observable<Users>;
    abstract getUser(id: number): Observable<User>;
    abstract createUser (payload: User);
    abstract updateUser(id: number, payload: User) ;
    abstract updateGroups(userid: number, payload: number[], isAddRoles:boolean);
    abstract getGroups(userid: number);
    abstract getPermissions(userid: number): Observable<Permission[]>;
}
