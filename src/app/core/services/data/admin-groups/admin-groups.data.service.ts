
import { Group } from './../../../models/group';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { Role_GetAllOutputDTO } from 'src/app/core/dtos/role-get-all-output.dto';
import { Permission } from 'src/app/core/enum/permission';

@Injectable({
    providedIn: 'root'
})
export abstract class AdminGroupsDataService {

    constructor() { }
   
    abstract getGroups(): Observable<Role_GetAllOutputDTO[]>;
    abstract getGroup(id: number): Observable<Group>;
    abstract createGroup(payload: Group): Observable<Group>;
    abstract disableGroup(id: number, payload: Group);
    abstract enableGroup(id: number, payload: Group);
    abstract updateGroup(id: number, payload: Group);
    abstract assignToGroups(groupId: number, payload: number[]);
    abstract getGroupPermissions(groupId: number): Observable<Permission[]>;
    abstract updateGroupPermissions(groupId: number, payload: number[]);
    abstract getGroupMembers(groupId: number): Observable<User[]>;
    abstract addGroupMembers(groupId: number, payload: number[]);
    abstract removeGroupMembers(groupId: number, payload: number[]);
}