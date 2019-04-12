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
import { Document_GetByIdOutputDTO } from 'src/app/core/dtos/output/documents/Document_GetByIdOutputDTO';
import { Document_UpdateInputDTO } from 'src/app/core/dtos/input/documents/Document_UpdateInputDTO';
import { Document_InsertInputDTO } from 'src/app/core/dtos/input/documents/Document_InsertInputDTO';
import { UploadRequest_InsertInputDTO } from 'src/app/core/dtos/input/upload-request/UploadRequest_InsertInputDTO';

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

        var _response = automapper.map(response, MediaItem, response);
        _response.forEach(resp => {          
          if (!resp.thumbnail) {
            if (resp.documentTypeCode === 'PDF') {
              resp.thumbnail = 'https://media.idownloadblog.com/wp-content/uploads/2016/04/52ff0e80b07d28b590bbc4b30befde52-484x320.png';
            } else if (resp.documentTypeCode === 'DOCX') {
              resp.thumbnail = 'http://icons.iconarchive.com/icons/pelfusion/flat-file-type/256/doc-icon.png';
            }
          }
          resp.type = resp.documentTypeCode;
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

  getMediaItem(id: any): Observable<MediaItem> {
    var requestUri = environment.api.baseUrl + `/v1/documents/${id}`;

    return this.httpClient.get<Document_GetByIdOutputDTO>(requestUri).pipe(
      map(
        response => {
          automapper
            .createMap(response, MediaItem)
            .forMember('id', function(opts) { opts.mapFrom('documentId'); })
            .forMember('directoryId', function(opts) { opts.mapFrom('DirectoryId'); })
            .forMember('directoryName', function(opts) { opts.mapFrom('DiirectoryName'); })
            .forMember('directoryParentId', function(opts) { opts.mapFrom('DirectoryParentId'); })
            .forMember('directoryParentName', function(opts) { opts.mapFrom('DirectoryParentName'); })
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
            .forMember('status', function(opts) { opts.mapFrom('Status'); });

        
          var _response = automapper.map(response, MediaItem, response);
          if (!_response.thumbnail) {
            if (_response.documentTypeCode === 'PDF') {
              _response.thumbnail = 'https://media.idownloadblog.com/wp-content/uploads/2016/04/52ff0e80b07d28b590bbc4b30befde52-484x320.png';
            } else if (_response.documentTypeCode === 'DOCX') {
              _response.thumbnail = 'http://icons.iconarchive.com/icons/pelfusion/flat-file-type/256/doc-icon.png';
            }
          }
          _response.type = _response.documentTypeCode;
          console.log('MediaWebDataService - getMedia: ', _response);
          return _response;
        }
      ),
      catchError(e => {
        console.log("'MediaWebDataService - getMedia error:", e);
        return of(null);
      })
    );
  }

  updateMediaItem(id: any, payload: MediaItem): Observable<any> {
    const requestUri = environment.api.baseUrl + `/v1/documents/${id}`;

    automapper
      .createMap(payload, Document_UpdateInputDTO)      
      .forMember('storageType', function(opts) { opts.mapFrom('storageType'); })
      .forMember('entityType', function(opts) { opts.mapFrom('entityType'); })
      .forMember('entityId', function(opts) { opts.mapFrom('entityId'); })
      .forMember('documentTypeCode', function(opts) { opts.mapFrom('documentTypeCode'); })
      .forMember('documentName', function(opts) { opts.mapFrom('name'); })
      .forMember('documentUrl', function(opts) { opts.mapFrom('url'); })
      .forMember('metadata', function(opts) { opts.mapFrom('metadata'); })
      .forMember('contentType', function(opts) { opts.mapFrom('contentType'); })
      .forMember('containerId', function(opts) { opts.mapFrom('containerId'); })
      .forMember('size', function(opts) { opts.mapFrom('size'); })
      .forMember('thumbnailContainerUrl', function(opts) { opts.mapFrom('thumbnail'); })
      .forMember('isDeleted', function(opts) { opts.mapFrom('isDeleted'); })
      .forMember('status', function(opts) { opts.mapFrom('status'); });

    const request = automapper.map(payload, Document_UpdateInputDTO, payload);

    console.log('MediaWebDataService - updateMediaItem: ', request);

    return this.httpClient.put(requestUri, request).pipe(map(
      response => {
        
        console.log('MediaWebDataService - updateMediaItem: ', response);
        return response;
      })
    );
  }

  createMediaItem(payload: MediaItem): Observable<any> {
    const requestUri = environment.api.baseUrl + `/v1/uploadrequests`;

    payload.id = this.newGuid();



    automapper
      .createMap(payload, UploadRequest_InsertInputDTO)      
      .forMember('UploadRequestId', function(opts) { opts.mapFrom('requestId'); })
      .forMember('Requester', function(opts) { opts.mapFrom('requester'); })
      .forMember('documentId', function(opts) { opts.mapFrom('id'); })
      .forMember('directoryId', function(opts) { opts.mapFrom('directoryId'); })
      .forMember('documentTypeCode', function(opts) { opts.mapFrom('documentTypeCode'); })
      .forMember('documentName', function(opts) { opts.mapFrom('name'); })
      .forMember('documentUrl', function(opts) { opts.mapFrom('url'); })
      .forMember('metadata', function(opts) { opts.mapFrom('metadata'); })
      .forMember('contentType', function(opts) { opts.mapFrom('contentType'); })
      .forMember('containerId', function(opts) { opts.mapFrom('containerId'); })
      .forMember('size', function(opts) { opts.mapFrom('size'); })
      .forMember('thumbnailContainerUrl', function(opts) { opts.mapFrom('thumbnail'); })

    const request = automapper.map(payload, UploadRequest_InsertInputDTO, payload);

    console.log('MediaWebDataService - createMediaItem: ', request);

    return this.httpClient.post<any>(requestUri, request).pipe(map(
      response => {        
        console.log('MediaWebDataService - createMediaItem: ', response);
        return response;
      })
    );
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

  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
