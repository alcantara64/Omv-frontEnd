
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/core/models/member';

@Injectable({
    providedIn: 'root'
})
export abstract class AdminMembersDataService {

    constructor() { }

    abstract getMembers(): Observable<Member[]>;
    abstract getMembersByGroupId(groupid: number);
}