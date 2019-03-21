import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.css']
})
export class LeftnavComponent implements OnInit {

  dashboardLink = '/admin/dashboard';
  usersLink = '/admin/users';
  groupsLink = '/admin/groups';

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
        this.isUsersMenuOpen = true;
        this.isUsersActive = true;
        return;
      case this.groupsLink:      
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
