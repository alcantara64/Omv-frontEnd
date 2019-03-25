
import { Group } from './../../../models/group';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export abstract class AdminGroupsDataService {

    constructor() { }
   
    abstract getGroups(): Observable<Group[]>;
    abstract getGroup(id: number): Observable<Group>;
    abstract createGroup(payload: Group): Observable<Group>;
    abstract disableGroup(id: number, payload: Group);
    abstract enableGroup(id: number, payload: Group);
    abstract updateGroup(id: number, payload: Group);
    abstract assignToGroups(groupId: number, payload: number[]);
    abstract getGroupsByUserId(userId: number);
    abstract getPermissionsByGroupId(userId: number);
}