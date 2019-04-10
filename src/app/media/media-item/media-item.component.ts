import { Component, OnInit } from '@angular/core';
import { Tab } from 'src/app/core/models/tab';
import { Store } from '@ngxs/store';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { SetCurrentMediaItemId } from '../state/media/media.action';
import { takeWhile } from 'rxjs/operators';

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
  componentActive: boolean = true;

  constructor(protected store: Store, private router: Router, private route: ActivatedRoute) {
    super(store);
    this.ShowLefNav(false);
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      let mediaItemId = params.get('id');
      if (mediaItemId) {
        this.store.dispatch(new SetCurrentMediaItemId(mediaItemId));
      }
    }),
      takeWhile(() => this.componentActive);
  }

  switchTabs(tabLink: string) {
    this.router.navigate([tabLink]);
  }
}
