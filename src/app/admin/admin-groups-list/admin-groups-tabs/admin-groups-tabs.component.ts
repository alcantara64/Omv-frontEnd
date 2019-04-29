import { Component, OnInit } from '@angular/core';
import { Tab } from 'src/app/core/models/tab';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-groups-tabs',
  templateUrl: './admin-groups-tabs.component.html',
  styleUrls: ['./admin-groups-tabs.component.css']
})
export class AdminGroupsTabsComponent implements OnInit {

  groupsTabs: Tab[] = [
    { link: '/admin/groups/active', name: 'Active Groups'},
    { link: '/admin/groups/disabled', name: 'Disabled Groups' }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  switchTabs(tabLink: string) {
    this.router.navigate([ tabLink ]);
  }

}
