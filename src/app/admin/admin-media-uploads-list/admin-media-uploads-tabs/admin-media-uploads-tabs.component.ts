import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tab } from 'src/app/core/models/tab';

@Component({
  selector: 'app-admin-media-uploads-tabs',
  templateUrl: './admin-media-uploads-tabs.component.html',
  styleUrls: ['./admin-media-uploads-tabs.component.css']
})
export class AdminMediaUploadsTabsComponent implements OnInit {

  uploadsTabs: Tab[] = [
    { link: '/admin/media/uploads/new', name: 'New Uploads'  },
    { link: '/admin/media/uploads/in-progress', name: 'Uploads In-Progress' },
    { link: '/admin/media/uploads/history', name: 'Uploads History' , isActive: true}
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  switchTabs(tabLink: string) {
    this.router.navigate([ tabLink ]);
  }
}
