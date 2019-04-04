import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {MediaDataService} from "../../data/media/media.data.service";
import { History } from 'src/app/core/models/entity/history';

import { MediaItem } from 'src/app/core/models/entity/media';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private MediaDataService: MediaDataService) { }

  getMedia(): Observable<MediaItem[]> {
    return this.MediaDataService.getMedia();
  }
  
  toggleFavorite(id: number, payload: MediaItem): Observable<any> {
    return this.MediaDataService.toggleFavorite(id, payload);
  }

  getMediaItem(id: number): Observable<MediaItem> {
    return this.MediaDataService.getMediaItem(id);
  }
  
  getHistory(id: number): Observable<History[]> {
    return this.MediaDataService.getHistory(id);
  }

  getMetadata(id: number): Observable<any[]> {
    return this.MediaDataService.getMetadata(id);
  }

  getMetadataOptions(id: any): Observable<any[]> {
    return this.MediaDataService.getMetadataOptions(id);
  }
}
