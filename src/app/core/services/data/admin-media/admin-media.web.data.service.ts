import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import { Observable, of } from 'rxjs';
import * as automapper from 'automapper-ts';
import { AdminMediaDataService } from './admin-media.data.service';
import { catchError, map } from 'rxjs/operators';
import { UploadRequestHistory_GetAllOutputDTO } from 'src/app/core/dtos/output/uploads/UploadRequestHistory_GetAllOutputDTO';
import { environment } from 'src/environments/environment';
import { UploadRequest_GetAllOutputDTO } from 'src/app/core/dtos/output/uploads/UploadRequest_GetAllOutputDTO';
import { MetadataFields } from 'src/app/core/models/entity/metadata-fields';
import { MetadataList } from 'src/app/core/models/entity/metadata-list';
import { MetadataList_GetAllOutputDTO } from 'src/app/core/dtos/output/metadata/MetadataList_GetAllOutputDTO';
import { MetadataList_InsertInputDTO } from 'src/app/core/dtos/input/metadata/MetadataList_InsertInputDTO';
import { MetadataListInputDTO } from 'src/app/core/dtos/input/metadata/MetadataListInputDTO';

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
  
  getUploadRequest(id: number): Observable<any> {
    var url = `./assets/mock/upload-request-item.json`;
    let data = this.httpClient.get<any>(url);
    return data;
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
    var requestUri = environment.api.baseUrl + `/v1/metadatalists`;

    return this.httpClient.get<MetadataList_GetAllOutputDTO[]>(requestUri).pipe(map(
      response => {
        automapper
          .createMap(MetadataList_GetAllOutputDTO, MetadataList)
          .forMember('id', function (opts) { opts.mapFrom('metadataListId'); })
          .forMember('fieldName', function (opts) { opts.mapFrom('metadataListName'); })
          .forMember('status', function (opts) { opts.mapFrom('status'); })
          .forMember('statusName', function (opts) {opts.mapFrom('statusName'); });

        let _response = automapper.map(MetadataList_GetAllOutputDTO, MetadataList, response);
        console.log('AdminMediaWebDataService - getMetaDataLists: ', _response);
        return _response;
      }),
      catchError(e => {
        console.log("AdminMediaWebDataService - getMetaDataLists error: ", e);
        return of(null);
      })
    );
  }

  createMetadataList(payload: MetadataList): Observable<MetadataList> {
    const requestUri = environment.api.baseUrl + `/v1/metadatalists`;

    automapper
      .createMap(payload, MetadataList_InsertInputDTO)
      .forMember('metadataListId', function(opts) { opts.mapFrom('id'); })
      .forMember('metadataListName', function(opts) { opts.mapFrom('fieldName'); })
      .forMember('status', function(opts) { opts.mapFrom('status'); })
      .forMember('statusName', function(opts) {opts.mapFrom9('statusName'); });

    const request = automapper.map(payload, MetadataList_InsertInputDTO, payload);
    console.log('AdminMediaWebDataService - createMetadataList request: ', request);
    console.log('AdminMediaWebDataService - createMetadataList payload: ', payload);

    return this.httpClient.post(requestUri, request).pipe(map(
      response => {
        automapper
          .createMap(MetadataList_InsertInputDTO, MetadataList)
          .forMember('id', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('metadataListId'))
          .forMember('name', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('metadataListName'))
          .forMember('status', function(opts) { opts.mapFrom('status'); })
          .forMember('statusName', function(opts) {opts.mapFrom('statusName'); });

        let _response = automapper.map(MetadataList_InsertInputDTO, MetadataList, response);
        console.log('AdminMediaWebDataService - createMetadataList: ', _response);
        return _response;
      }),
      catchError(e => {
        console.log("AdminMediaWebDataService - createMetadataList error: ", e);
        return of(null);
      })
    );
  }

  updateMetadataList(id: number, payload: MetadataList){
    const requestUri = environment.api.baseUrl + `/v1/metadatalists/${id}`;

    automapper
    .createMap(payload, MetadataListInputDTO)
    .forMember('MetadataListId', function(opts) {opts.mapFrom('id'); })
    .forMember('MetadataListName', function(opts) {opts.mapFrom('fieldName'); })
    .forMember('status', function(opts) {opts.mapFrom('status'); })
    .forMember('statusName', function(opts){opts.mapFrom('statusName');});

    const request = automapper.map(payload, MetadataListInputDTO, payload );
    console.log('AdminMediaWebDataService - updateMetadataList: ', request);

    return this.httpClient.put(requestUri, request).pipe(map(
      response => {
        automapper
        .createMap(MetadataListInputDTO, MetadataList )
        .forMember('id', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('MetadataListId'))
        .forMember('name', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('MetadataListName'))
        .forMember('status', function(opts) { opts.mapFrom('status'); })
        .forMember('statusName', function(opts){opts.mapFrom('statusName');});

        let _response = automapper.map(MetadataListInputDTO, MetadataList, response);
        console.log('AdminMediaWebDataService - updateMetadataList: ', _response);
        return _response;
      }
    ))
  }

  removeMetadataList(id: number ) {
    throw new Error("Method not implemented.");
  }
}
