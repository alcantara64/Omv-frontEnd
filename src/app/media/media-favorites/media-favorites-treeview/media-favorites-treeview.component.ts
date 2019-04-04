import { Component, OnInit } from '@angular/core';
import { Media } from 'src/app/core/models/media';
import { Store, Selector, Select } from '@ngxs/store';
import { GetMedia } from '../../state/media/media.action';
import { MediaState } from '../../state/media/media.state';
import { Observable } from 'rxjs';
import { GridColumn } from 'src/app/core/models/grid.column';
import { MediaTreeGrid } from 'src/app/core/models/media-tree-grid';
import { HttpClient } from '@angular/common/http';
import { MediaService } from 'src/app/core/services/business/media/media.service';

@Component({
  selector: 'app-media-favorites-treeview',
  templateUrl: './media-favorites-treeview.component.html',
  styleUrls: ['./media-favorites-treeview.component.css']
})
export class MediaFavoritesTreeviewComponent implements OnInit {
  public data: MediaTreeGrid[];
  @Select(MediaState.getMedia) mediaData$ : Observable<MediaTreeGrid[]>;
 @Select(MediaState.getTotalMedia) total$: Observable<number>;
  
  constructor(private store: Store, private mediaService: MediaService) { }

  ngOnInit() {
    this.mediaService.getMediaTreeData().subscribe(
      data =>{
        this.data = data;
        console.log(this.data);
      }
    );
  }

}
