import { Component, OnInit } from '@angular/core';
import { MediaState } from '../../state/media/media.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MediaItem } from 'src/app/core/models/entity/media';
import { GetMedia, GetFavorites } from '../../state/media/media.action';

@Component({
  selector: 'app-media-favorites-tileview',
  templateUrl: './media-favorites-tileview.component.html',
  styleUrls: ['./media-favorites-tileview.component.css']
})
export class MediaFavoritesTileviewComponent implements OnInit {

  @Select(MediaState.getFavorites) favoriteMedia$: Observable<MediaItem[]>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetFavorites());
  }
}
