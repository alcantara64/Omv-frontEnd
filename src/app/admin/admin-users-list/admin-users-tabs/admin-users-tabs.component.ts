import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tab } from 'src/app/core/models/tab';

@Component({
  selector: 'app-admin-users-tabs',
  templateUrl: './admin-users-tabs.component.html',
  styleUrls: ['./admin-users-tabs.component.css']
})
export class AdminUsersTabsComponent implements OnInit {

  // usersLinks: string[] = [ '/admin/users/active', '/admin/users/unassigned', '/admin/users/disabled' ];

  usersTabs: Tab[] = [
    {
      link: '/admin/users/active',
      name: 'Active Users'
    },
    {
      link: '/admin/users/unassigned',
      name: 'Unassigned Users'
    },
    {
      link: '/admin/users/disabled',
      name: 'Disabled Users'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  switchTabs(tabLink: string) {
    this.router.navigate([ tabLink ]);
  }
}
