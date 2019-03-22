import { Group } from './../../../models/group';
import { Injectable } from '@angular/core';
import { AdminGroupsDataService } from '../../data/admin-groups/admin-groups.data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGroupsService {

  constructor(private AdminGroupsDataService: AdminGroupsDataService) { }

  getGroups(): Observable<Group[]> {
    return this.AdminGroupsDataService.getGroups();
  }

  getGroup(id: number): Observable<Group> {
    return this.AdminGroupsDataService.getGroup(id);
  }

  disableGroup(id: number, payload: Group){
    return this.AdminGroupsDataService.disableGroup(id, payload);
  }

  enableGroup(id: number, payload: Group) {
    return this.AdminGroupsDataService.enableGroup(id, payload);
  }

  updateGroup(id: number, payload: Group) {
    return this.AdminGroupsDataService.updateGroup(id, payload);
  } 
   
  assignToGroups(groupId: number, payload: number[]) {
    return this.AdminGroupsDataService.assignToGroups(groupId, payload);
  }
}
