import { MediaItem } from './../../../models/entity/media';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaDataService } from './media.data.service';
import { History } from 'src/app/core/models/entity/history';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class MediaMockDataService implements MediaDataService {

  constructor(private httpClient: HttpClient) { }

  getMedia(): Observable<MediaItem[]> {
    var url = `./assets/mock/media-favorite-listview.json`;
    let data = this.httpClient.get<MediaItem[]>(url);
    return data;
  }

  getHistory(id: number): Observable<History[]> {
    var url = `./assets/mock/media-history.json`;
    let data = this.httpClient.get<History[]>(url);
    return data;
  }

  getMediaItem(id: number): Observable<MediaItem> {
    var url = `./assets/mock/media-tile-view.json`;
    let data = this.httpClient.get<MediaItem[]>(url).pipe(
      map(items => {
        return items.find(x => x.id === id);
      })
    );
    return data;
  }
}
