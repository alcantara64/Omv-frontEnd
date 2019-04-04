import { Component, OnInit } from '@angular/core';
import { MediaItem } from 'src/app/core/models/entity/media';
import { MediaService } from 'src/app/core/services/business/media/media.service';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { MediaState } from '../../state/media/media.state';
import { Observable } from 'rxjs';
import { GetMedia, ToggleFavorite } from '../../state/media/media.action';

@Component({
  selector: 'app-all-media-tileview',
  templateUrl: './all-media-tileview.component.html',
  styleUrls: ['./all-media-tileview.component.css']
})
export class AllMediaTileviewComponent implements OnInit {
  
  media: MediaItem[];
  mediaType: string;

  @Select(MediaState.getMedia) media$: Observable<MediaItem[]>;

  constructor(private store: Store,
    private router: Router,
    private mediaService : MediaService) { }

  ngOnInit() {
    this.store.dispatch(new GetMedia());
  }

  navigate(data: any) {
    this.router.navigate([`media/${data.id}/details`]);
  }

  toggleFavorite(data: any) {
    this.store.dispatch(new ToggleFavorite(data.id, data));
  }
}
