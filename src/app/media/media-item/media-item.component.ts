import { Component, OnInit } from '@angular/core';
import { Tab } from 'src/app/core/models/tab';
import { Store, Select } from '@ngxs/store';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { MediaState } from '../state/media/media.state';
import { Observable } from 'rxjs';
import { SetMediaId } from '../state/media/media.action';

@Component({
  selector: 'app-media-item',
  templateUrl: './media-item.component.html',
  styleUrls: ['./media-item.component.css']
})
export class MediaItemComponent extends BaseComponent implements OnInit {

  mediaItemTabs: Tab[] = [
    { link: '/media/8/details', name: 'Details', isActive: true },
    { link: '/media/8/related-items', name: 'Related Items' },
    { link: '/media/8/history', name: 'History' }
  ];
  mediaID: number;
  @Select(MediaState.setMediaItemId) mediaId$: Observable<number>;
  id: number;
  constructor(protected store: Store, private router: Router, private activeRoute: ActivatedRoute) {
    super(store);
    this.ShowLefNav(false);
  }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      this.mediaID = Number(params.get('id'));
      this.store.dispatch(new SetMediaId(this.mediaID));
      this.mediaId$.subscribe(id => this.id = id);
   
    });
  }

  switchTabs(tabLink: string) {
    this.router.navigate([tabLink]);
  }
}
