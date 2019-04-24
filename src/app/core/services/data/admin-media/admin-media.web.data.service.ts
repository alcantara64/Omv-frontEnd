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
import { MetadataListItem } from 'src/app/core/models/entity/metadata-list-item';
import { MetadataListItemInputDTO } from 'src/app/core/dtos/input/metadata/MetadataListItemInputDTO';
import { MetadatListItem_UpdateInputDTO } from 'src/app/core/dtos/input/metadata/MetadatListItem_UpdateInputDTO';
import { MetadataListItem_GetByIdOutputDTO } from 'src/app/core/dtos/output/metadata/MetadataListItem_GetByIdOutputDTO';
import { MetadataDetail } from 'src/app/core/models/entity/metadata-detail';

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
  getMetaDataListsDetail(id: number): Observable<MetadataDetail> {
       let requestUri = environment.api.baseUrl + `/v1/metadatalists/${id}`;

    return this.httpClient.get<MetadataList>(requestUri).pipe(map(
      response => {
        automapper
          .createMap(MetadataList, MetadataDetail)
          .forMember('metadataListId', function (opts) { opts.mapFrom('metadataListId'); })
          .forMember('metadataListName', function (opts) { opts.mapFrom('metadataListName'); })
          .forMember('status', function (opts) { opts.mapFrom('status'); })
          .forMember('statusName', function (opts) { opts.mapFrom('statusName'); });

        let _response = automapper.map(MetadataList, MetadataDetail, response);
        console.log(_response, 'this is our  getMetaDataListsDetail ')
        console.log('AdminMediaWebDataService - getMetaDataListsDetail: ', _response);
        return _response;
      }),
      catchError(e => {
        console.log("AdminMediaWebDataService - getMetaDataListsDetail error: ", e);
        return of(null);
      })
    );
  }

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

  removeMetadataField(id: number) {
    throw new Error("Method not implemented.");
  }
  createMetadataField(payload: MetadataFields): Observable<MetadataFields> {
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
          .forMember('statusName', function (opts) { opts.mapFrom('statusName'); });

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
      .forMember('metadataListId', function (opts) { opts.mapFrom('id'); })
      .forMember('metadataListName', function (opts) { opts.mapFrom('fieldName'); })
      .forMember('status', function (opts) { opts.mapFrom('status'); });

    const request = automapper.map(payload, MetadataList_InsertInputDTO, payload);
    console.log('AdminMediaWebDataService - createMetadataList request: ', request);
    console.log('AdminMediaWebDataService - createMetadataList payload: ', payload);

    return this.httpClient.post(requestUri, request).pipe(map(
      response => {
        automapper
          .createMap(MetadataList_GetAllOutputDTO, MetadataList)
          .forMember('id', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('metadataListId'))
          .forMember('name', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('metadataListName'))
          .forMember('status', function (opts) { opts.mapFrom('status'); })
          .forMember('statusName', function (opts) { opts.mapFrom('statusName'); });

        let _response = automapper.map(MetadataList_GetAllOutputDTO, MetadataList, response);
        console.log('AdminMediaWebDataService - createMetadataList: ', _response);
        return _response;
      }),
      catchError(e => {
        console.log("AdminMediaWebDataService - createMetadataList error: ", e);
        return of(null);
      })
    );
  }

  updateMetadataList(id: number, payload: MetadataList) {
    const requestUri = environment.api.baseUrl + `/v1/metadatalists/${id}`;

    automapper
      .createMap(payload, MetadataListInputDTO)
      .forMember('MetadataListId', function (opts) { opts.mapFrom('id'); })
      .forMember('MetadataListName', function (opts) { opts.mapFrom('fieldName'); })
      .forMember('status', function (opts) { opts.mapFrom('status'); })

    const request = automapper.map(payload, MetadataListInputDTO, payload);
    console.log('AdminMediaWebDataService - updateMetadataList: ', request);

    return this.httpClient.put(requestUri, request).pipe(map(
      response => {
        automapper
          .createMap(MetadataListInputDTO, MetadataList)
          .forMember('id', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('MetadataListId'))
          .forMember('name', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('MetadataListName'))
          .forMember('status', function (opts) { opts.mapFrom('status'); })
          .forMember('statusName', function (opts) { opts.mapFrom('statusName'); });

        let _response = automapper.map(MetadataListInputDTO, MetadataList, response);
        console.log('AdminMediaWebDataService - updateMetadataList: ', _response);
        return _response;
      }
    ))
  }

  removeMetadataList(id: number) {
    const requestUri = environment.api.baseUrl + `/v1/metadatalists/${id}`;

    console.log('AdminMediaWebDataService   - removeMembers: ', id);

    return this.httpClient.delete(requestUri);
  }


  getMetaDataListsItem(): Observable<MetadataListItem[]> {
    return null;
  }
  getMetaDataListItemById(id: number): Observable<MetadataListItem[]> {
    const requestUri = environment.api.baseUrl + `/v1/metadatalistitem/${id}/listitems`;

    return this.httpClient.get<MetadataListItem_GetByIdOutputDTO[]>(requestUri).pipe(map(
      response => {
        automapper
          .createMap(MetadataListItem_GetByIdOutputDTO, MetadataListItem)
          .forMember('metadataListItemId', function (opts) { opts.mapFrom('metadataListItemId'); })
          .forMember('metadataListId', function (opts) { opts.mapFrom('metadataListId'); })
          .forMember('itemValue', function (opts) { opts.mapFrom('itemValue'); })
          .forMember('itemDescription', function (opts) { opts.mapFrom('itemDescription'); })
          .forMember('itemSort', function (opts) { opts.mapFrom('itemSort'); })
          .forMember('parentItemValue', function (opts) { opts.mapFrom('parentItemValue'); })
          .forMember('status', function (opts) { opts.mapFrom('status'); })
          .forMember('statusName', function (opts) { opts.mapFrom('statusName'); });


        let _response = automapper.map(MetadataListItem_GetByIdOutputDTO, MetadataListItem, response);
        console.log('AdminMediaWebDataService - getMetaDataListItemById: ', response);

        return _response;

      }),
      catchError(e => {
        console.log("AdminMediaWebDataService - getMetaDataListItemById error:", e);
        return of(null);
      })
    );
  }

  createMetadataListItem(id: number,payload: MetadataListItem): Observable<MetadataListItem> {
    var requestUri = environment.api.baseUrl + `/v1/metadatalistitem/${id}/listitems`;

    automapper
      .createMap(payload, MetadataListItemInputDTO)
      .forMember('metadataListItemId', function (opts) { opts.mapFrom('metadataListItemId'); })
      .forMember('metadataListId', function (opts) { opts.mapFrom('metadataListId'); })
      .forMember('itemDescription', function (opts) { opts.mapFrom('itemDescription'); })
      .forMember('itemValue', function (opts) { opts.mapFrom('itemValue')})
      .forMember('itemSort', function (opts) { opts.mapFrom('itemSort')})
      .forMember('parentItemValue', function (opts) { opts.mapFrom('parentItemValue')})
      .forMember('status', function (opts) { opts.mapFrom('status')})
      .forMember('statusName', function (opts) { opts.mapFrom('statusName')});

    const request = automapper.map(payload, MetadataListItemInputDTO, payload);
    console.log('AdminMediaWebDataService - createMetadataListItem request: ', request);
    console.log('AdminMediaWebDataService - createMetadataListItem payload: ', payload);

    return this.httpClient.post(requestUri, request).pipe(map(
      response => {
        automapper
          .createMap(MetadataListItemInputDTO, MetadataListItem)
          .forMember('metadataListItemId', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('metadataListItemId'))
          .forMember('metadataListId', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('metadataListId'))
          .forMember('itemDescription', function (opts) { opts.mapFrom('itemDescription'); })
          .forMember('itemValue', function (opts) { opts.mapFrom('itemValue'); })
          .forMember('itemSort', function (opts) { opts.mapFrom('itemSort')})
          .forMember('parentItemValue', function (opts) { opts.mapFrom('parentItemValue')})
          .forMember('status', function (opts) { opts.mapFrom('status')})
          .forMember('statusName', function (opts) { opts.mapFrom('statusName')});

        let _response = automapper.map(MetadataListItemInputDTO, MetadataListItem, response);
        console.log('AdminMediaWebDataService - createMetadataListItem: ', _response);
        return _response;
      }),
      catchError(e => {
        console.log("AdminMediaWebDataService - createMetadataListItem error: ", e);
        return of(null);
      })
    );
  }

  removeMetadataListItem(id: number, metadataListItemId:number) {
    const requestUri = environment.api.baseUrl + `/v1/metadatalistitem/${id}/listitems/${metadataListItemId}`;

    console.log('AdminMediaWebDataService   - removeMetadataListItem: ', id);
    return this.httpClient.delete(requestUri);
  }
  updateMetadataListItem(id: number, payload: MetadataListItem) {
    var requestUri = environment.api.baseUrl + `/v1/metadatalistitem/${id}/listitems`;

    automapper
      .createMap(payload, MetadatListItem_UpdateInputDTO)
  }

  getMetaDataListById(id: number): Observable<MetadataList> {
    throw new Error("Method not implemented.");
  }
}
