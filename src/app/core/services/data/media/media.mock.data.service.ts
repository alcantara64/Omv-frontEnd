import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaDataService } from './media.data.service';
import {Media} from "../../../models/entity/media";
import { History } from 'src/app/core/models/entity/history';


@Injectable({
    providedIn: 'root'
  })
export class MediaMockDataService implements MediaDataService {
  mockUrl = `./assets/mock/`;

  constructor(private httpClient: HttpClient) { }

  getMedia(): Observable<Media[]> {
    let data = this.httpClient.get<Media[]>(this.mockUrl + 'media-favorite-listview.json');
    return data;
  }

  getHistory(id: number): Observable<History[]> {
    let data = this.httpClient.get<History[]>(this.mockUrl + 'media-history.json');
    return data;
  }
}
