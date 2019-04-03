import { BaseComponent } from './../shared/base/base.component';
import { Component, OnInit } from '@angular/core';
import { Tab } from '../core/models/tab';
import { Router, ActivatedRoute } from '@angular/router';
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
  currentRoute: any;  

  constructor(protected store: Store, private router: Router, private route: ActivatedRoute) {
    super(store);
    this.ShowLefNav(false);
   }

  ngOnInit() {

  }
  
  switchTabs(tabLink: string) {
    this.router.navigate([ tabLink ]);
  }

  navigateToView(view: string) {
    var url = this.router.url.split('?')[0];
    this.router.navigate([url], { queryParams: { view: view } } );
  }
}
