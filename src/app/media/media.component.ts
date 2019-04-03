import { BaseComponent } from './../shared/base/base.component';
import { Component, OnInit } from '@angular/core';
import { Tab } from '../core/models/tab';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent extends BaseComponent implements OnInit {

  mediaTabs: Tab[] = [
    { link: '/media/all', name: 'All Media', isActive: true  },
    { link: '/media/favorites', name: 'Favorites' },
    { link: '/media/archive', name: 'Streaming Archive' }
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
