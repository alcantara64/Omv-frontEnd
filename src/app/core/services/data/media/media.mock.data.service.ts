import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaDataService } from './media.data.service';
import {MediaTileView } from 'src/app/core/models/media';
import { Media } from 'src/app/core/models/entity/media';


@Injectable({
    providedIn: 'root'
  })

export class MediaMockDataService implements MediaDataService {

  mockUrl = `./assets/mock/media-favorite-listview.json`;

  constructor(private httpClient: HttpClient) { }

  getMedia(): Observable<Media[]> {
    let data = this.httpClient.get<Media[]>(this.mockUrl);
    return data;
  }
  getAllMedia(): Observable<MediaTileView[]> {
    var url = `./assets/mock/media-tile-view.json`;
    let data = this.httpClient.get<MediaTileView[]>(url);
    return data;
  }
}
