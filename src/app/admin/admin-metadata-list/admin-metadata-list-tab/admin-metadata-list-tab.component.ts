import { Component, OnInit } from '@angular/core';
import { Tab } from 'src/app/core/models/tab';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-metadata-list-tab',
  templateUrl: './admin-metadata-list-tab.component.html',
  styleUrls: ['./admin-metadata-list-tab.component.css']
})
export class AdminMetadataListTabComponent implements OnInit {


  metadataListTabs: Tab[] = [
    { link: 'admin/media/metadata/active', name: 'Active Lists',   },
    { link: 'admin/media/metadata/disabled', name: 'Disabled Lists' }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  switchTabs(tabLink: string) {
    this.router.navigate([ tabLink ]);
  }
}
