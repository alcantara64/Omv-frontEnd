import { AdminMembersDataService } from './admin-members.data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/core/models/member';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })

export class AdminMembersMockDataService implements AdminMembersDataService {


    constructor(private httpClient:HttpClient) {
    
}
    getMembers(): Observable<Member[]> {
        var mockUrl = `./assets/mock/members.json`;
        var data = this.httpClient.get<Member[]>(mockUrl);
        return data;
    }
    getMembersByGroupId(groupid: number) {
        var mockUrl = `./assets/mock/members.json`;
        var data = this.httpClient.get<Member[]>(mockUrl);
        return data;
    }

}