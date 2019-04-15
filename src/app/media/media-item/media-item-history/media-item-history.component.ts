import { Component, OnInit } from '@angular/core';
import { GridColumn } from 'src/app/core/models/grid.column';
import { Observable } from 'rxjs';
import { MediaItem } from 'src/app/core/models/entity/media';
import { MediaState } from '../../state/media/media.state';
import { Select, Store } from '@ngxs/store';
import { GetHistory } from '../../state/media/media.action';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-media-item-history',
  templateUrl: './media-item-history.component.html',
  styleUrls: ['./media-item-history.component.css']
})
export class MediaItemHistoryComponent implements OnInit {

  @Select(MediaState.getHistory) getHistoryMedia$: Observable<MediaItem[]>;

  public historyList;

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
    this.route.paramMap.subscribe(params => {
      let mediaItemId = params.get('id');
    this.store.dispatch(new GetHistory(mediaItemId));
    });
    this.getHistoryMedia$.subscribe(historyMedia => {
      this.historyList = historyMedia;
    });
  }

}
