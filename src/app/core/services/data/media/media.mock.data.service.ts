import { MediaItem } from './../../../models/entity/media';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MediaDataService } from './media.data.service';
import { History } from 'src/app/core/models/entity/history';
import { map } from 'rxjs/operators';
import { MediaTreeGrid } from 'src/app/core/models/media-tree-grid';

@Injectable({
    providedIn: 'root'
  })
export class MediaMockDataService implements MediaDataService {

  constructor(private httpClient: HttpClient) { }

  getMedia(pageNumber?: number, pageSize?: number): Observable<MediaItem[]> {
    var url = `./assets/mock/media.json`;
    let data = this.httpClient.get<MediaItem[]>(url).pipe(
      map(item => {
        if (pageNumber === 1) {
          let retVal = item.splice(0,4);          
          console.log(retVal);
          return retVal;
        } else if (pageNumber === 2) {
          let retVal = item.splice(4, item.length);          
          console.log(retVal);
          return retVal;
        } else{
          return item;
        }
      }));
    return data;
  }

  getMediaItem(id: number): Observable<any> {
    var url = `./assets/mock/media.json`;
    let data = this.httpClient.get<any[]>(url).pipe(
      map(items => {
        return items.find(x => x.id === id.toString());
      })
    );
    return data;
  }

  createMediaItem(payload: MediaItem): Observable<any> {
    return of(1);
  }

  updateMediaItem(id: any, payload: MediaItem): Observable<any> {
    return of(1);
  }

  getHistory(id: string): Observable<History[]> {
    var url = `./assets/mock/media-history.json`;
    let data = this.httpClient.get<History[]>(url);
    return data;
  }

  toggleFavorite(id: number, payload: MediaItem): Observable<any> {
    return of(1);
  }

  getMediaTreeData(): Observable<MediaTreeGrid[]> {
    var url = `./assets/mock/media-treeview.json`;
    let data = this.httpClient.get<MediaTreeGrid[]>(url);
    return data;
  }
  getMetadata(id: number): Observable<any[]> {
    var url = `./assets/mock/metadata.json`;
    let data = this.httpClient.get<any[]>(url);
    return data;
  }

  getMetadataOptions(id: any): Observable<any[]> {
    var url = `./assets/mock/metadata-list.json`;
    let data = this.httpClient.get<any[]>(url).pipe(
      map(options => {
        return options.filter(x => x.optionsId === id);
      })
    );
    return data;
  }
}
