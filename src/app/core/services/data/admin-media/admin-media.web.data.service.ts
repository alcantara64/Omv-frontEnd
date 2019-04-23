import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import { Observable, of } from 'rxjs';
import { AdminMediaDataService } from './admin-media.data.service';
import { catchError, map } from 'rxjs/operators';
import { UploadRequestHistory_GetAllOutputDTO } from 'src/app/core/dtos/output/uploads/UploadRequestHistory_GetAllOutputDTO';
import { environment } from 'src/environments/environment';
import { UploadRequest_GetAllOutputDTO } from 'src/app/core/dtos/output/uploads/UploadRequest_GetAllOutputDTO';
import { MetadataFields } from 'src/app/core/models/entity/metadata-fields';
import { MetadataList } from 'src/app/core/models/entity/metadata-list';
import { MetadataListItem } from 'src/app/core/models/entity/metadata-list-item';

@Injectable({
  providedIn: 'root'
})

export class AdminMediaWebDataService implements AdminMediaDataService {




  private paging_batch_size: number = 25;
  mockUrl = `./assets/mock/`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private httpClient: HttpClient) { }

  getUploadHistory(): Observable<UploadHistory[]> {
    var requestUri = environment.api.baseUrl + `/v1/uploadrequests`;

    return this.httpClient.get<UploadRequest_GetAllOutputDTO[]>(requestUri).pipe(map(
      response => {
        automapper
          .createMap(UploadRequestHistory_GetAllOutputDTO, UploadHistory)
          .forMember('uploadRequestType', function (opts) { opts.mapFrom('uploadRequestType'); })
          .forMember('requester', function (opts) { opts.mapFrom('requester'); })
          .forMember('directoryId', function (opts) { opts.mapFrom('directoryId'); })
          .forMember('status', function (opts) { opts.mapFrom('status'); })
          .forMember('statusName', function (opts) { opts.mapFrom('statusName'); })
          .forMember('size', function (opts) { opts.mapFrom('size'); })
          .forMember('metadata', function (opts) { opts.mapFrom('metadata'); })
          .forMember('containerId', function (opts) { opts.mapFrom('containerId'); })
          .forMember('documentName', function (opts) { opts.mapFrom('documentName'); })
          .forMember('documentTypeCode', function (opts) { opts.mapFrom('documentTypeCode'); });

        let _response = automapper.map(UploadRequestHistory_GetAllOutputDTO, UploadHistory, response);
        console.log('AdminMediaWebDataService - getUploadHistory: ', _response);


        return _response;
      }),
      catchError(e => {
        console.log("AdminMediaWebDataService - getUploadHistory error: ", e);
        return of(null);
      })
    );
  }
  getMetaDataFields(): Observable<MetadataFields[]> {
    return null;
  }

  removeMetadataField(id: number ) {
    throw new Error("Method not implemented.");
  }
  createMetadataField(payload: MetadataFields):Observable<MetadataFields> {
    return null;
  }

  getMetaDataLists(): Observable<MetadataList[]> {
    return null;
  }

  removeMetadataList(id: number ) {
    throw new Error("Method not implemented.");
  }
  createMetadataList(payload: MetadataList):Observable<MetadataList> {
    return null;
  }
  updateMetadataList(id: number, payload: MetadataList){
    return null;
  }
  
  getMetaDataListsItem(): Observable<MetadataListItem[]> {
    return null;
  }
  getMetaDataListItem(id:number): Observable<MetadataListItem[]> {
    return null;
  }

  removeMetadataListItem(id: number ) {
    throw new Error("Method not implemented.");
  }
  createMetadataListItem(payload: MetadataListItem):Observable<MetadataListItem> {
    return null;
  }
  updateMetadataListItem(id: number, payload: MetadataListItem){
    return null;
  }
  
  getMetaDataListById(id: number): Observable<MetadataList> {
    throw new Error("Method not implemented.");
  }
}
