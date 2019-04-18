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
import { MetadataField_GetAllOutputDTO } from 'src/app/core/dtos/output/metadata/MetadataField_GetAllOutputDTO';
import { MetadataField_GetByIdOutputDTO } from 'src/app/core/dtos/output/metadata/MetadataField_GetByIdOutputDTO';

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
          .createMap(UploadRequest_GetAllOutputDTO, UploadHistory)
          .forMember('uploadRequestType', function (opts) { opts.mapFrom('uploadRequestType'); })
          .forMember('requester', function (opts) { opts.mapFrom('requester'); })
          .forMember('directoryId', function (opts) { opts.mapFrom('directoryId'); })
          .forMember('status', function (opts) { opts.mapFrom('status'); })
          .forMember('statusName', function (opts) { opts.mapFrom('statusName'); })
          .forMember('size', function (opts) { opts.mapFrom('size'); })
          .forMember('metadata', function (opts) { opts.mapFrom('metadata'); })
          .forMember('containerId', function (opts) { opts.mapFrom('containerId'); })
          .forMember('documentName', function (opts) { opts.mapFrom('documentName'); })
          .forMember('documentTypeCode', function (opts) { opts.mapFrom('documentTypeCode'); })
          .forMember('files', function (opts) { opts.mapFrom('files'); });

        let _response = automapper.map(UploadRequest_GetAllOutputDTO, UploadHistory, response);
        console.log('AdminMediaWebDataService - getUploadHistory: ', _response);
        _response.map(x => x.files = 100);

        return _response;
      }),
      catchError(e => {
        console.log("AdminMediaWebDataService - getUploadHistory error: ", e);
        return of(null);
      })
    );
  }
  getMetaDataFields(): Observable<MetadataFields[]> {
    var requestUri = environment.api.baseUrl + `/v1/metadatafields`;

    return this.httpClient.get<MetadataField_GetAllOutputDTO[]>(requestUri).pipe(map(
      response => {
        automapper
          .createMap(MetadataField_GetAllOutputDTO, MetadataFields)
          .forMember('metadataFieldId', function (opts) { opts.mapFrom('metadataFieldId'); })
          .forMember('entityId', function (opts) { opts.mapFrom('entityId'); })
          .forMember('entityName', function (opts) { opts.mapFrom('entityName'); })
          .forMember('metadataListId', function (opts) { opts.mapFrom('metadataListId'); })
          .forMember('metadataListName', function (opts) { opts.mapFrom('metadataListName'); })
          .forMember('fieldTypeId', function (opts) { opts.mapFrom('fieldTypeId'); })
          .forMember('fieldName', function (opts) { opts.mapFrom('fieldName'); })
          .forMember('status', function (opts) { opts.mapFrom('status'); });

        let _response = automapper.map(MetadataField_GetAllOutputDTO, MetadataFields, response);
        console.log('AdminMediaWebDataService - getMetaDataFields: ', _response);
        

        return _response;
      }),
      catchError(e => {
        console.log("AdminMediaWebDataService - getMetaDataFields error: ", e);
        return of(null);
      })
    );
  }

  removeMetadataField(id: number ) {
    throw new Error("Method not implemented.");
  }
  createMetadataField(payload: MetadataFields):Observable<MetadataFields> {
    return null;
  }
  getNewUploads(): Observable<UploadHistory[]> {
    throw new Error("Method not implemented.");
  }

  getUploadRequest(id: number): Observable<any> {
    var url = `./assets/mock/upload-request-item.json`;
    let data = this.httpClient.get<any>(url);
    return data;
  }
  
  updateUploadStatus(id: number, payload: UploadHistory) {
    throw new Error("Method not implemented.");
  }
  updateMetaDataField(id: number, payload: MetadataFields) {
    throw new Error("Method not implemented.");
  }
  getMetaDataFieldById(id:number): Observable<MetadataFields[]> {
    var requestUri = environment.api.baseUrl + `/v1/metadatafields${id}`;

    return this.httpClient.get<MetadataField_GetByIdOutputDTO[]>(requestUri).pipe(map(
      response => {
        automapper
          .createMap(MetadataField_GetAllOutputDTO, MetadataFields)
          .forMember('metadataFieldId', function (opts) { opts.mapFrom('metadataFieldId'); })
          .forMember('metadataListId', function (opts) { opts.mapFrom('metadataListId'); })
          .forMember('fieldTypeId', function (opts) { opts.mapFrom('fieldTypeId'); })
          .forMember('fieldName', function (opts) { opts.mapFrom('fieldName'); })
          .forMember('status', function (opts) { opts.mapFrom('status'); });

        let _response = automapper.map(MetadataField_GetAllOutputDTO, MetadataFields, response);
        console.log('AdminMediaWebDataService - getMetaDataFields: ', _response);
        

        return _response;
      }),
      catchError(e => {
        console.log("AdminMediaWebDataService - getMetaDataFields error: ", e);
        return of(null);
      })
    );
  }

}
