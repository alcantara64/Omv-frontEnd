import { Component, OnInit } from '@angular/core';
import { Tab } from 'src/app/core/models/tab';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/base/base.component';

@Component({
  selector: 'app-media-item',
  templateUrl: './media-item.component.html',
  styleUrls: ['./media-item.component.css']
})
export class MediaItemComponent extends BaseComponent implements OnInit {

  mediaItemTabs: Tab[] = [
    { link: '/media/8/details', name: 'Details', isActive: true  },
    { link: '/media/8/related-items', name: 'Related Items' },
    { link: '/media/8/history', name: 'History' }
  ];

  constructor(protected store: Store, private router: Router) {
    super(store);
    this.ShowLefNav(false);
  }

  ngOnInit() {
  }

  switchTabs(tabLink: string) {
    this.router.navigate([ tabLink ]);
  }
}
