import { Group } from '../../../models/entity/group';
import { Injectable } from '@angular/core';
import { AdminGroupsDataService } from '../../data/admin-groups/admin-groups.data.service';
import { Observable } from 'rxjs';
import { Permission } from 'src/app/core/enum/permission';
import { User } from 'src/app/core/models/entity/user';

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

  createGroup(payload: Group): Observable<Group> {
    return this.AdminGroupsDataService.createGroup(payload);
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

  getGroupPermissions(groupId: number): Observable<Permission[]> {
    return this.AdminGroupsDataService.getPermissions(groupId);
  }

  updateGroupPermissions(groupId: number, payload: number[]) {
    return this.AdminGroupsDataService.updatePermissions(groupId, payload);
  }

  getGroupMembers(groupId: number): Observable<User[]> {
    return this.AdminGroupsDataService.getMembers(groupId);
  }

  addGroupMembers(groupId: number, payload: number[]) {
    return this.AdminGroupsDataService.addMembers(groupId, payload);
  }

  removeGroupMembers(groupId: number, payload: number[]) {
    return this.AdminGroupsDataService.removeMembers(groupId, payload);
  }
}
