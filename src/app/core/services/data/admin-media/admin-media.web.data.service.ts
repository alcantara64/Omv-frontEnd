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
import { UploadRequest_InsertInputDTO } from 'src/app/core/dtos/input/uploads/UploadRequest_InsertInputDTO';
import { UploadRequest_UpdateStatusInputDTO } from 'src/app/core/dtos/input/uploads/UploadRequest_UpdateStatusInputDTO';
import { MetadataList } from 'src/app/core/models/entity/metadata-list';
import { MetadataField_GetListItemByIdOutputDTO } from 'src/app/core/dtos/output/metadata/MetadataField_GetListItemByIdOutputDTO';
import { MetadataField_InsertInputDTO } from 'src/app/core/dtos/input/metadata/MetadataField_InsertInputDTO';
import * as automapper from 'automapper-ts';
import { MetadataListItem_UpdateInputDTO } from 'src/app/core/dtos/input/metadata/MetadataListItem_UpdateInputDTO';
import { MetadataFieldType } from 'src/app/core/models/entity/metadata-fieldtype';
import { FieldType_GetAllOutputDTO } from 'src/app/core/dtos/output/metadata/FieldType_GetAllOutputDTO';

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

  removeMetadataField(id: number) {
    const requestUri = environment.api.baseUrl + `/v1/metadatafields/${id}`;

    return this.httpClient.delete(requestUri);
  }
  createMetadataField(payload: MetadataFields): Observable<MetadataFields> {
    const requestUri = environment.api.baseUrl + `/v1/metadatafields`;

    automapper
      .createMap(payload, MetadataField_InsertInputDTO)
      .forMember('metadataFieldId', function (opts) { opts.mapFrom('metadataFieldId'); })
      .forMember('fieldName', function (opts) { opts.mapFrom('fieldName'); })
      .forMember('metadataListId', function (opts) { opts.mapFrom('metadataListId'); })
      .forMember('fieldTypeId', function (opts) { opts.mapFrom('fieldTypeId'); })
      .forMember('isRequired', function (opts) { opts.mapFrom('isRequired'); });

    const request = automapper.map(payload, MetadataField_InsertInputDTO, payload);
    console.log('AdminGroupsWebDataService - createMetadataField request: ', request);
    console.log('AdminGroupsWebDataService - createMetadataField payload: ', payload);

    return this.httpClient.post(requestUri, request).pipe(map(
      response => {
        automapper
          .createMap(MetadataField_InsertInputDTO, MetadataFields)
          .forMember('metadataFieldId', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('metadataFieldId'))
          .forMember('fieldName', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('fieldName'))
          .forMember('metadataListId', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('metadataListId'))
          .forMember('fieldTypeId', function (opts) { opts.mapFrom('fieldTypeId'); })
          .forMember('isDeleted', function (opts) { opts.mapFrom('isDeleted'); })
          .forMember('relatedField', function (opts) { opts.mapFrom('relatedField'); })

          .forMember('sort', function (opts) { opts.mapFrom('sort'); })
          .forMember('status', function (opts) { opts.mapFrom('status'); })

        let _response = automapper.map(MetadataField_InsertInputDTO, MetadataField_InsertInputDTO, response);
        console.log('AdminGroupsWebDataService - createMetadataField: ', _response);
        return _response;
      })
    );
  }
  getNewUploads(): Observable<UploadHistory[]> {
    var requestUri = environment.api.baseUrl + `/v1/uploadrequests?isDraft=true`;

    return this.httpClient.get<UploadRequest_GetAllOutputDTO[]>(requestUri).pipe(map(
      response => {
        automapper
          .createMap(UploadRequest_GetAllOutputDTO, UploadHistory)
          .forMember('id', function (opts) { opts.mapFrom('uploadRequestId'); })
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
        console.log('AdminMediaWebDataService - getNewUploads: ', _response);
        _response.map(x => x.files = 100);
        _response.forEach((upload) => {
          upload.destination = '';
        });

        return _response;
      }),
      catchError(e => {
        console.log("AdminMediaWebDataService - getNewUploads error: ", e);
        return of(null);
      })
    );
  }

  getUploadRequest(id: number): Observable<any> {
    var url = `./assets/mock/upload-request-item.json`;
    let data = this.httpClient.get<any>(url);
    return data;
  }

  approveUploads(id: number) {
    const requestUri = environment.api.baseUrl + `/v1/uploadrequests/${id}/approve`;

    return this.httpClient.put(requestUri, {});

  }
  rejectUploads(id: number) {
    const requestUri = environment.api.baseUrl + `/v1/uploadrequests/${id}/reject`;

    return this.httpClient.put(requestUri, {});

  }
  updateMetaDataField(id: number, payload: MetadataFields) {
    const requestUri = environment.api.baseUrl + `/v1/metadatafields/${id}`;

    automapper
      .createMap(payload, MetadataListItem_UpdateInputDTO)
      .forMember('metadataFieldId', function(opts) { opts.mapFrom('metadataFieldId'); })
      .forMember('fieldName', function(opts) { opts.mapFrom('fieldName'); })
      .forMember('metadataListId', function(opts) { opts.mapFrom('metadataListId'); })
      .forMember('fieldTypeId', function(opts) { opts.mapFrom('fieldTypeId'); })

    const request = automapper.map(payload, MetadataListItem_UpdateInputDTO, payload);

    // request.isSystem = request.isSystem.toString();
    // request.roleName = request.roleName ? request.roleName.toString() : '';
    console.log('AdminGroupsWebDataService - updateMetaDataField: ', request);

    return this.httpClient.put(requestUri, request).pipe(map(
      response => {
        automapper
          .createMap(MetadataListItem_UpdateInputDTO, MetadataFields)
          .forMember('metadataFieldId', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('metadataFieldId'))
          .forMember('fieldName', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('fieldName'))
          .forMember('metadataListId', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('metadataListId'))
          .forMember('fieldTypeId', function(opts) { opts.mapFrom('fieldTypeId'); })
          .forMember('isRequired', function(opts) { opts.mapFrom('isRequired'); })
          .forMember('isDeleted', function(opts) { opts.mapFrom('isDeleted'); })

          .forMember('relatedField', function(opts) { opts.mapFrom('relatedField'); })
          .forMember('sort', function(opts) { opts.mapFrom('sort'); })
          .forMember('status', function(opts) { opts.mapFrom('status'); });

        let _response = automapper.map(MetadataListItem_UpdateInputDTO, MetadataFields, response);
        console.log('AdminGroupsWebDataService - updateMetaDataField: ', _response);
        return _response;

      })
    );
  }
  getMetaDataFieldById(id: number): Observable<MetadataFields[]> {
    var requestUri = environment.api.baseUrl + `/v1/metadatafields/${id}`;

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

  getMetadataListById(id: number): Observable<MetadataList[]> {
    var requestUri = environment.api.baseUrl + `/v1/metadatalistitem/${id}/listitems`;

    return this.httpClient.get<MetadataField_GetListItemByIdOutputDTO[]>(requestUri).pipe(map(
      response => {
        automapper
          .createMap(MetadataField_GetAllOutputDTO, MetadataFields)
          .forMember('metadataListItemId', function (opts) { opts.mapFrom('metadataListItemId'); })
          .forMember('metadataListId', function (opts) { opts.mapFrom('metadataListId'); })
          .forMember('itemValue', function (opts) { opts.mapFrom('itemValue'); })
          .forMember('itemDescription', function (opts) { opts.mapFrom('itemDescription'); })
          .forMember('itemSort', function (opts) { opts.mapFrom('itemSort'); });

        let _response = automapper.map(MetadataField_GetAllOutputDTO, MetadataFields, response);
        console.log('AdminMediaWebDataService - getMetadataListById: ', _response);


        return _response;
      }),
      catchError(e => {
        console.log("AdminMediaWebDataService - getMetadataListbyId error: ", e);
        return of(null);
      })
    );
  }


  getMetadataFieldTypes(): Observable<MetadataFieldType[]> {
    var requestUri = environment.api.baseUrl + `/v1/fieldtypes`;

    return this.httpClient.get<FieldType_GetAllOutputDTO[]>(requestUri).pipe(map(
      response => {
        automapper
          .createMap(FieldType_GetAllOutputDTO, MetadataFieldType)
          .forMember('fieldTypeId', function (opts) { opts.mapFrom('fieldTypeId'); })
          .forMember('type', function (opts) { opts.mapFrom('type'); });

        let _response = automapper.map(FieldType_GetAllOutputDTO, MetadataFieldType, response);
        console.log('AdminMediaWebDataService - getMetadataListById: ', _response);


        return _response;
      }),
      catchError(e => {
        console.log("AdminMediaWebDataService - getMetadataListbyId error: ", e);
        return of(null);
      })
    );
  }
}
