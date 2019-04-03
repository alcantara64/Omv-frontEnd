import { Component, OnInit } from '@angular/core';
import { MediaState } from '../../state/media/media.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Media } from 'src/app/core/models/entity/media';
import { GetMedia } from '../../state/media/media.action';
import { sample } from 'rxjs/operators';

@Component({
  selector: 'app-media-favorites-tileview',
  templateUrl: './media-favorites-tileview.component.html',
  styleUrls: ['./media-favorites-tileview.component.css']
})
export class MediaFavoritesTileviewComponent implements OnInit {
  @Select(MediaState.getFavoriteMedia) getFavoriteMedia$: Observable<Media[]>;

  public favoritesData;
  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetMedia());
    this.getFavoriteMedia$.subscribe(favorites => this.favoritesData = favorites);
  }

}
