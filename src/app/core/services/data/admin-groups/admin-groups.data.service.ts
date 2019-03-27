
import { Group } from '../../../models/entity/group';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/entity/user';
import { Permission } from 'src/app/core/enum/permission';

@Injectable({
    providedIn: 'root'
})
export abstract class AdminGroupsDataService {

    constructor() { }

    abstract getGroups(): Observable<Group[]>;
    abstract getGroup(id: number): Observable<Group>;
    abstract createGroup(payload: Group): Observable<Group>;
    abstract updateGroup(id: number, payload: Group);
    abstract getPermissions(groupId: number): Observable<Permission[]>;
    abstract updatePermissions(groupId: number, payload: string[]);
    abstract getMembers(groupId: number): Observable<User[]>;
    abstract addMembers(groupId: number, payload: number[]);
    abstract removeMembers(groupId: number, payload: number[]);
}
