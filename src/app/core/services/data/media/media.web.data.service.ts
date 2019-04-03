import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Media} from "../../../models/entity/media";
import {MediaDataService} from "./media.data.service";

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
}
