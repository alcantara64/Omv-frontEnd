import { Component, OnInit } from '@angular/core';
import { MediaItem } from 'src/app/core/models/entity/media';
import { MediaService } from 'src/app/core/services/business/media/media.service';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { MediaState } from '../../state/media/media.state';
import { Observable } from 'rxjs';
import { GetMedia, ToggleFavorite, SetSelectedItems } from '../../state/media/media.action';
import { EmitType } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-all-media-tileview',
  templateUrl: './all-media-tileview.component.html',
  styleUrls: ['./all-media-tileview.component.css']
})
export class AllMediaTileviewComponent implements OnInit {

  media: MediaItem[];
  pageSize = 100;
  totalMedia: number;
  pageCount: number;

  @Select(MediaState.getMedia) media$: Observable<MediaItem[]>;
  @Select(MediaState.getTotalMedia) totalMedia$: Observable<number>;

  constructor(private store: Store, private router: Router, private mediaService: MediaService) { }

  ngOnInit() {
    this.store.dispatch(new GetMedia(1, this.pageSize));

    this.totalMedia$.subscribe(totalMedia => {
      this.totalMedia = totalMedia;
      this.pageCount = Math.ceil(this.totalMedia / this.pageSize);
    });
  }

  navigate(data: MediaItem) {
    this.router.navigate([`media/${data.documentId}/details`]);
  }

  selectedItemData(data: any[]) {
    this.store.dispatch(new SetSelectedItems(data));
  }

  toggleFavorite(data: any) {
    this.store.dispatch(new ToggleFavorite(data.id, data));
  }

  changePage(event): EmitType<object> {
    if (event.currentPage) {
      this.store.dispatch(new GetMedia(event.currentPage, this.pageSize));
      console.log(event);
    }
    return event;
  }
}
