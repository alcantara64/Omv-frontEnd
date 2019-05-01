import { Component, OnInit, OnDestroy } from '@angular/core';
import { GridColumn } from 'src/app/core/models/grid.column';
import { Observable, Subject } from 'rxjs';
import { MediaItem } from 'src/app/core/models/entity/media';
import { MediaState } from '../../state/media/media.state';
import { Select, Store } from '@ngxs/store';
import { GetHistory, GetMediaItemDetails } from '../../state/media/media.action';
import { ActivatedRoute } from '@angular/router';
import { takeWhile, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-media-item-history',
  templateUrl: './media-item-history.component.html',
  styleUrls: ['./media-item-history.component.css']
})
export class MediaItemHistoryComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject();
  @Select(MediaState.getHistory) getHistoryMedia$: Observable<MediaItem[]>;
  @Select(MediaState.getMediaItemId) mediaItemId$: Observable<any>;

  historyList;

  columns: GridColumn[] = [
    { type: '', headerText: 'Field Title', width: '', field: 'eventName ' },
    { type: '', headerText: 'Action Taken', width: '', field: 'columnName ' },
    { type: '', headerText: 'Updated By', width: '', field: 'entityType ' },
    { type: '', headerText: 'Old Value', width: '150', field: 'oldValue' },
    { type: '', headerText: 'New Value', width: '', field: 'newValue' },
    { type: '', headerText: 'Date', width: '150', field: 'createdBy ' }
  ];
  
  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit() {
    this.mediaItemId$
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(id => {
      console.log('MediaItemHistoryComponent ngOnInit: ', id);
      this.store.dispatch(new GetHistory(id));
    });
    
    // this.route.paramMap.subscribe(params => {
    //   console.log('MediaItemHistoryComponent ngOnInit: ', params);
    //   let mediaItemId = params.get('id');

      
    // });
    this.getHistoryMedia$.subscribe(historyMedia => {
      this.historyList = historyMedia;
    });
  }

  ngOnDestroy() {    
    console.log('ngOnDestory');
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
