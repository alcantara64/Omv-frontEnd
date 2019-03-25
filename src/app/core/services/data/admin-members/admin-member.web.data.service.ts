import { AdminMembersDataService } from './admin-members.data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/core/models/member';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })

export class AdminMembersWebDataService implements AdminMembersDataService {
    getMembers(): Observable<Member[]> {
        throw new Error("Method not implemented.");
    }
    getMembersByGroupId(groupid: number) {
        throw new Error("Method not implemented.");
    }


    constructor(private httpClient:HttpClient) {
    
}

}