import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/User';
import { AdminGroupsDataService } from './admin-groups.data.service';
import { Group } from 'src/app/core/models/group';


@Injectable({
    providedIn: 'root'
  })

export class AdminGroupsWebDataService implements AdminGroupsDataService {

     
    private paging_batch_size:number = 25;
    
    constructor(private httpClient: HttpClient) { }

    getGroups(): Observable<Group[]> {
        throw new Error("Method not implemented.");
    }
    getGroup(id: number): Observable<Group> {
        throw new Error("Method not implemented.");
    }
    disableGroup(id: number, payload: Group) {
        throw new Error("Method not implemented.");
    }
    enableGroup(id: number, payload: Group) {
        throw new Error("Method not implemented.");
    }
    updateGroup(id: number, payload: Group) {
        throw new Error("Method not implemented.");
    }
    assignToGroups(groupId: number, payload: number[]) {
        throw new Error("Method not implemented.");
    }
    getGroupsByUserId(userId: number) {
        throw new Error("Method not implemented.");
    }

}