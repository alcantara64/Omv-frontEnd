import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {MediaDataService} from "./media.data.service";
import { Media } from 'src/app/core/models/entity/media';
import { MediaTileView } from 'src/app/core/models/media';

@Injectable({
    providedIn: 'root'
  })

export class MediaWebDataService implements MediaDataService {

  private paging_batch_size: number = 25;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private httpClient: HttpClient) { }

  getMedia(): Observable<Media[]> {
    let mockUrl = `./assets/mock/media-favorite-listview.json`;
    let data = this.httpClient.get<Media[]>(mockUrl);

    return data;
  }

  getAllMedia(): Observable<MediaTileView[]> {
    let mockUrl = `./assets/mock/media-tile-view.json`;
    let data = this.httpClient.get<MediaTileView[]>(mockUrl);

    return data;
  }
}
