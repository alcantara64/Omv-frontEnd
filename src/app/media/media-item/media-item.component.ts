import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tab } from 'src/app/core/models/tab';
import { Store, Select } from '@ngxs/store';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { SetCurrentMediaItemId } from '../state/media/media.action';
import { takeWhile } from 'rxjs/operators';
import { MediaState } from '../state/media/media.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-media-item',
  templateUrl: './media-item.component.html',
  styleUrls: ['./media-item.component.css']
})
export class MediaItemComponent extends BaseComponent implements OnInit, OnDestroy {

  mediaItemTabs: Tab[] = [];
  componentActive = true;
  @Select(MediaState.getMediaItemId) id$: Observable<number>;
  
  id: string;
  constructor(protected store: Store, private router: Router, private route: ActivatedRoute) {
    super(store);
    this.ShowLefNav(false);
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      let mediaItemId = params.get('id');
      this.id = mediaItemId;
      if (mediaItemId) {
        this.store.dispatch(new SetCurrentMediaItemId(mediaItemId));
      }
      this.mediaItemTabs = [
        { link: `/media/${this.id}/details`, name: 'Details', isActive: true },
        { link: `/media/${this.id}/related-items`, name: 'Related Items' },
        { link: `/media/${this.id}/history`, name: 'History' }
      ];
    }), takeWhile(() => this.componentActive);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }


  switchTabs(tabLink: string) {
    this.router.navigate([tabLink]);
  }
}
