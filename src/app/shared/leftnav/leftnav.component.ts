import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from "@ngxs/store";
import { AppState } from "../../state/app.state";
import { Observable } from "rxjs";


@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.css']
})
export class LeftNavComponent implements OnInit {

  public displayWidth: number;
  public isAdminNavActive: boolean;
  isDashboardActive = false;

  isMediaMenuOpen: boolean;
  isMediaUploadsActive: boolean;
  isMediaFolderStructureActive: boolean;
  isMediaBulkUploaderActive: boolean;
  isMediaMetadataFieldsActive: boolean;
  isMediaMetaDataListActive: boolean;
  mediaMetadataFieldsLink = '/admin/media/metadata/fields';
  mediaMetadataLink = '/admin/media/metadata';
  mediaUploadsLink = '/admin/media/uploads';
  newMediaUploadsLink = '/admin/media/uploads/new';
  inProgressMediaUploadsLink = '/admin/media/uploads/in-progress';
  historyMediaUploadsLink = '/admin/media/uploads/history';

  isWorkPlanningMenuOpen: boolean;

  isUsersMenuOpen: boolean;
  isUsersActive: boolean;
  isGroupsActive: boolean;
  dashboardLink = '/admin/dashboard';
  usersLink = '/admin/users';
  activeUsersLink = '/admin/users/active';
  unassignedUsersLink = '/admin/users/unassigned';
  disabledUsersLink = '/admin/users/disabled';
  groupsLink = '/admin/groups';
  activeGroupsLink = '/admin/groups/active';
  disabledGroupsLink = '/admin/groups/disabled';

  @Select(AppState.setDeviceWidth) deviceWidth$: Observable<number>;

  constructor(private router: Router) {
    this.deviceWidth$.subscribe(width => {
      this.displayWidth = width;
    });

    // const button = document.getElementsByTagName("button")
  }

  ngOnInit() {
    this.setActiveTab(this.router.url);
    this.isAdminNavActive = false;
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
    this.showAdminNav();
    switch (url) {
      case this.dashboardLink:
        this.isDashboardActive = true;
        break;
      case this.mediaUploadsLink:
        this.isMediaMenuOpen = true;
        this.isMediaUploadsActive = true;
        break;
      case this.usersLink:
      case this.activeUsersLink:
      case this.unassignedUsersLink:
      case this.disabledUsersLink:
        this.isUsersMenuOpen = true;
        this.isUsersActive = true;
        break;
      case this.groupsLink:
      case this.activeGroupsLink:
      case this.disabledGroupsLink:
        this.isUsersMenuOpen = true;
        this.isGroupsActive = true;
        break;
      case this.mediaMetadataLink:
        this.isMediaMenuOpen = true;
        this.isMediaMetaDataListActive = true;
        this.isMediaMetadataFieldsActive = false;
        break;
      case this.mediaMetadataFieldsLink:
        this.isMediaMenuOpen = true;
        this.isMediaMetadataFieldsActive = true;
        this.isMediaMetaDataListActive = false;
        break;
      default:
        break;
    }
  }

  clearActiveSelections() {
    this.isUsersActive = this.isGroupsActive = this.isDashboardActive = this.isMediaUploadsActive = false;
  }

  showAdminNav() {
    this.isAdminNavActive === true ? this.isAdminNavActive = false : this.isAdminNavActive = true;
  }
}
