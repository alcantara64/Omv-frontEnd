import { BaseComponent } from './../../shared/base/base.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewType } from 'src/app/core/constants/view-type';
import { MediaService } from 'src/app/core/services/business/media/media.service';
import { Select, Store } from '@ngxs/store';
import { MediaState } from '../state/media/media.state';
import { Observable } from 'rxjs';
import { MediaTileView } from 'src/app/core/models/media';
import { GetMedia } from '../state/media/media.action';

const TILE_VIEW = 'tile';
const LIST_VIEW = 'list';
const TREE_VIEW = 'tree';
const MAP_VIEW = 'map';

@Component({
  selector: 'app-all-media',
  templateUrl: './all-media.component.html',
  styleUrls: ['./all-media.component.css']
})
export class AllMediaComponent extends BaseComponent implements OnInit {

  data: MediaTileView[];
  @Select(MediaState.getAll) allMediaData$: Observable<MediaTileView[]>

  viewType: string;
 
  constructor(protected store: Store, private route: ActivatedRoute, private mediaService: MediaService) {
    super(store);
  }

  ngOnInit() {
    this.store.dispatch(new GetMedia());
    this.allMediaData$.subscribe(allmedia => this.data = allmedia);
    this.route.queryParams.subscribe(
      params => {
        console.log(params['view']);
        this.viewType = params['view'] ? params['view'] : ViewType.TILE; 
    });
  }
}
