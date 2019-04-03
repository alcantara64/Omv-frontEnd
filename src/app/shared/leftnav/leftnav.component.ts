import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.css']
})
export class LeftNavComponent implements OnInit {

  dashboardLink = '/admin/dashboard';
  usersLink = '/admin/users';
  activeUsersLink = '/admin/users/active';
  unassignedUsersLink = '/admin/users/unassigned';
  disabledUsersLink = '/admin/users/disabled';
  groupsLink = '/admin/groups';
  activeGroupsLink = '/admin/groups/active';
  disabledGroupsLink = '/admin/groups/disabled';

  isMediaMenuOpen: boolean = false;
  isWorkPlanningMenuOpen: boolean = false;
  isUsersMenuOpen: boolean = false;
  isDashboardActive = false;
  isUsersActive: boolean = false;
  isGroupsActive: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.setActiveTab(this.router.url);
  }

  mediaMenuClicked() {
    this.isMediaMenuOpen = !this.isMediaMenuOpen;
    this.isDashboardActive = false;
  }

  workPlanningMenuClicked() {
    this.isWorkPlanningMenuOpen = !this.isWorkPlanningMenuOpen;
    this.isDashboardActive = false;
  }

  usersMenuClicked() {
    this.isUsersMenuOpen = !this.isUsersMenuOpen;
    this.isDashboardActive = false;
  }

  setActiveTab(url: string) {
    this.clearActiveSelections();
    this.router.navigate([url]);
    switch(url) {
      case this.dashboardLink:
        this.isDashboardActive = true;
        return;
      case this.usersLink:
      case this.activeUsersLink:
      case this.unassignedUsersLink:
      case this.disabledUsersLink:
        this.isUsersMenuOpen = true;
        this.isUsersActive = true;
        return;
      case this.groupsLink:
      case this.activeGroupsLink:
      case this.disabledGroupsLink:
        this.isUsersMenuOpen = true;
        this.isGroupsActive = true;
        return;
      
      default:
        return;
    }
  }

  clearActiveSelections() {
    this.isUsersActive = this.isGroupsActive = false;
  }
}
