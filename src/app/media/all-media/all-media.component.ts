import { Component, OnInit } from '@angular/core';
import { MediaService } from 'src/app/core/services/business/media/media.service';
import { MediaTileView } from 'src/app/core/models/media';
import { Select, Store } from '@ngxs/store';
import { MediaState } from '../state/media/media.state';
import { Observable } from 'rxjs';
import { GetAllMedia } from '../state/media/media.action';


@Component({
  selector: 'app-all-media',
  templateUrl: './all-media.component.html',
  styleUrls: ['./all-media.component.css']
})
export class AllMediaComponent implements OnInit {
  data: MediaTileView[];
  @Select(MediaState.getAllMedia) allMediaData$: Observable<MediaTileView[]>
  constructor(private mediaService: MediaService, private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetAllMedia());
    this.allMediaData$.subscribe(allmedia => this.data = allmedia);
  }
}
