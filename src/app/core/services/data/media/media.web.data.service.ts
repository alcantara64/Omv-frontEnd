import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MediaDataService} from "./media.data.service";
import { map, catchError } from 'rxjs/operators';
import * as automapper from 'automapper-ts';
import { History } from 'src/app/core/models/entity/history';
import { MediaItem } from 'src/app/core/models/entity/media';
import { MediaTreeGrid } from 'src/app/core/models/media-tree-grid';
import { environment } from 'src/environments/environment';
import { Document_SearchOutputDTO } from 'src/app/core/dtos/output/documents/Document_SearchOutputDTO';
import { FileTypes } from 'src/app/core/enum/fileTypes';

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

  getMedia(pageNumber?: number, pageSize?: number): Observable<MediaItem[]> {

    var requestUri = environment.api.baseUrl + `/v1/documents`;

    console.log('AdminUsersWebDataService - getMedia - requestUrl ', requestUri);

    return this.httpClient.get<Document_SearchOutputDTO[]>(requestUri).pipe(map(
      response => {
        automapper
          .createMap(response, MediaItem)
          .forMember('id', function(opts) { opts.mapFrom('documentId'); })
          .forMember('storageType', function(opts) { opts.mapFrom('StorageType'); })
          .forMember('entityType', function(opts) { opts.mapFrom('EntityType'); })
          .forMember('entityId', function(opts) { opts.mapFrom('EntityId'); })
          .forMember('documentTypeCode', function(opts) { opts.mapFrom('DocumentTypeCode'); })
          .forMember('name', function(opts) { opts.mapFrom('documentName'); })
          .forMember('url', function(opts) { opts.mapFrom('documentUrl'); })
          .forMember('metadata', function(opts) { opts.mapFrom('Metadata'); })
          .forMember('contentType', function(opts) { opts.mapFrom('ContentType'); })
          .forMember('containerId', function(opts) { opts.mapFrom('ContainerId'); })
          .forMember('size', function(opts) { opts.mapFrom('Size'); })
          .forMember('thumbnail', function(opts) { opts.mapFrom('thumbnailContainerUrl'); })
          .forMember('isDeleted', function(opts) { opts.mapFrom('IsDeleted'); })
          .forMember('status', function(opts) { opts.mapFrom('Status'); })
          .forMember('createdOn', function(opts) { opts.mapFrom('createdOn'); })
          .forMember('createdBy', function(opts) { opts.mapFrom('createdBy'); })
          .forMember('modifiedOn', function(opts) { opts.mapFrom('modifiedOn'); })
          .forMember('modifiedBy', function(opts) { opts.mapFrom('modifiedBy'); })

        let splitByLastDot = function(text) {
          var index = text.lastIndexOf('.');
          return [text.slice(0, index), text.slice(index + 1)]
        }
        var _response = automapper.map(response, MediaItem, response);
        _response.forEach(resp => {
          let splitName = splitByLastDot(resp.name);
          resp.name = splitName[0].toUpperCase();
          resp.type = splitName[1].toUpperCase();
          
          if (!resp.thumbnail) {
            if (resp.type === 'PDF') {
              resp.thumbnail = 'https://media.idownloadblog.com/wp-content/uploads/2016/04/52ff0e80b07d28b590bbc4b30befde52-484x320.png';
            } else if (resp.type === 'DOCX') {
              resp.thumbnail = 'http://icons.iconarchive.com/icons/pelfusion/flat-file-type/256/doc-icon.png';
            }
          }
        });
        console.log('MediaWebDataService - getMedia: ', _response);
        return _response;
      }),
      catchError(e => {
        console.log("'MediaWebDataService - getMedia error:", e);
        return of(null);
      })
    );
  } 

  getMediaItem(id: number): Observable<any> {
    return null;
  }
  
  toggleFavorite(id: number, payload: MediaItem): Observable<any> {
    throw new Error("Method not implemented.");
  }

  getHistory(id: number): Observable<History[]> {
    return null;
  }
  getMediaTreeData(): Observable<MediaTreeGrid[]> {
    var url = `./assets/mock/media-treeview.json`;
    let data = this.httpClient.get<MediaTreeGrid[]>(url);
    return data;
  }
  
  getMetadata(id: number): Observable<any[]> {
    throw new Error("Method not implemented.");
  }

  getMetadataOptions(id: any): Observable<any[]> {
    throw new Error("Method not implemented.");
  }
}
