import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MediaDataService} from "./media.data.service";
import { map } from 'rxjs/operators';
import { History } from 'src/app/core/models/entity/history';
import { MediaItem } from 'src/app/core/models/entity/media';

@Injectable({
  providedIn: 'root'
})
export class MediaWebDataService implements MediaDataService {
  
  private paging_batch_size: number = 25;
  mockUrl = `./assets/mock/`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private httpClient: HttpClient) { }

  getMedia(): Observable<MediaItem[]> {
    return null;
  } 

  getMediaItem(id: number): Observable<MediaItem> {
    return null;
  }
  
  toggleFavorite(id: number, payload: MediaItem): Observable<any> {
    throw new Error("Method not implemented.");
  }

  getHistory(id: number): Observable<History[]> {
    return null;
  }
  
  getMetadata(id: number): Observable<any[]> {
    throw new Error("Method not implemented.");
  }

  getMetadataOptions(id: any): Observable<any[]> {
    throw new Error("Method not implemented.");
  }
}
