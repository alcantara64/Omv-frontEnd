import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/core/models/member';
import { AdminMembersDataService } from '../../data/admin-members/admin-members.data.service';

@Injectable({
  providedIn: 'root'
})
export class AdminMembersService  {

  constructor(private adminMemberService: AdminMembersDataService) { 

  }
   getMembers(): Observable<Member[]> {
    return this.adminMemberService.getMembers();
  }

  getMembersByGroupId(groupId): Observable<Member[]>{
    return this.adminMemberService.getMembersByGroupId(groupId);
  }
}
