import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaDataService } from './media.data.service';
import {Media} from "../../../models/entity/media";


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
}
