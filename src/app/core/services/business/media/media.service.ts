import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {MediaDataService} from "../../data/media/media.data.service";
import { History } from 'src/app/core/models/entity/history';

import { MediaItem } from 'src/app/core/models/entity/media';
import { MediaTreeGrid } from 'src/app/core/models/media-tree-grid';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private MediaDataService: MediaDataService) { }

  getMedia(pageNumber?: number, pageSize?: number): Observable<MediaItem[]> {
    return this.MediaDataService.getMedia(pageNumber, pageSize);
  }

  getMediaItem(id: number): Observable<MediaItem> {
    return this.MediaDataService.getMediaItem(id);
  }
  
  toggleFavorite(id: number, payload: MediaItem): Observable<any> {
    return this.MediaDataService.toggleFavorite(id, payload);
  }
  
  getHistory(id: number): Observable<History[]> {
    return this.MediaDataService.getHistory(id);
  }

  getMediaTreeData(): Observable<MediaTreeGrid[]> {
    return this.MediaDataService.getMediaTreeData();
  }
  
  getMetadata(id: number): Observable<any[]> {
    return this.MediaDataService.getMetadata(id);
  }

  getMetadataOptions(id: any): Observable<any[]> {
    return this.MediaDataService.getMetadataOptions(id);
  }
}
