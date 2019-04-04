import { BaseComponent } from './../shared/base/base.component';
import { Component, OnInit } from '@angular/core';
import { Tab } from '../core/models/tab';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MediaState } from './state/media/media.state';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent extends BaseComponent implements OnInit {

  mediaTabs: Tab[] = [
    { link: '/media/all', query: 'tile', name: 'All Media', isActive: true  },
    { link: '/media/favorites', query: 'tile', name: 'Favorites' },
    { link: '/media/archive', query: 'tile', name: 'Streaming Archive' }
  ];
 
  showtabs
  currentRoute: any;

  @Select(MediaState.getTotalMedia) totalMedia$: Observable<number>;

  constructor(protected store: Store, private router: Router, private route: ActivatedRoute) {
    super(store);
    this.ShowLefNav(false);
   }

  ngOnInit() {
  }
  
  switchTabs(tabLink: string) {
    this.router.navigate([ tabLink ], { queryParams: { view : 'tile' } });
  }

  navigateToView(view: string) {
    var url = this.router.url.split('?')[0];
    this.router.navigate([url], { queryParams: { view: view } } );
  }
  onIconClick(tab){
    this.showtabs = tab;
  }
}
