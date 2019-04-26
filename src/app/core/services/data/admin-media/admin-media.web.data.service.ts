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
import {MetadataList_GetAllOutputDTO} from '../../../dtos/output/metadata/MetadataList_GetAllOutputDTO';
import { MetadataField_UpdateInputDTO } from 'src/app/core/dtos/input/metadata/MetadataField_UpdateInputDTO';
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
          .forMember('uploadRequestId', function (opts) { opts.mapFrom('uploadRequestId'); })
          .forMember('requester', function (opts) { opts.mapFrom('requester'); })
          .forMember('source', function (opts) { opts.mapFrom('source'); })
          .forMember('destination', function (opts) { opts.mapFrom('destination'); })
          .forMember('ruleId', function (opts) { opts.mapFrom('ruleId'); })
          .forMember('ruleName', function (opts) { opts.mapFrom('ruleName'); })
          .forMember('isOCRAllowed', function (opts) { opts.mapFrom('isOCRAllowed'); })
          .forMember('isSRAllowed', function (opts) { opts.mapFrom('isSRAllowed'); })
          .forMember('size', function (opts) { opts.mapFrom('size'); })
          .forMember('files', function (opts) { opts.mapFrom('files'); })
          .forMember('iP', function (opts) { opts.mapFrom('iP'); })
          .forMember('requesterName', function (opts) { opts.mapFrom('requesterName'); })
          .forMember('status', function (opts) { opts.mapFrom('status'); })
          .forMember('statusName', function (opts) { opts.mapFrom('statusName'); });

        let _response = automapper.map(UploadRequest_GetAllOutputDTO, UploadHistory, response);
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
          .forMember('type', function (opts) { opts.mapFrom('type'); })
          
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
      .forMember('fieldTypeId', function (opts) { opts.mapFrom('fieldTypeId'); });

    const request = automapper.map(payload, MetadataField_InsertInputDTO, payload);
    console.log('AdminGroupsWebDataService - createMetadataField request: ', request);
    console.log('AdminGroupsWebDataService - createMetadataField payload: ', payload);

    return this.httpClient.post(requestUri, request).pipe(map(
      response => {
        automapper
          .createMap(MetadataField_InsertInputDTO, MetadataFields)
          .forMember('metadataFieldId', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('metadataFieldId'))
          .forMember('fieldName', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('fieldName'))
          .forMember('metadataListId', function (opts) { opts.mapFrom('metadataListId'); })
          .forMember('fieldTypeId', function (opts) { opts.mapFrom('fieldTypeId'); });

        let _response = automapper.map(MetadataField_InsertInputDTO, response);
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
          .forMember('uploadRequestType', function (opts) { opts.mapFrom('uploadRequestType'); })
          .forMember('uploadRequestId', function (opts) { opts.mapFrom('uploadRequestId'); })
          .forMember('requester', function (opts) { opts.mapFrom('requester'); })
          .forMember('source', function (opts) { opts.mapFrom('source'); })
          .forMember('destination', function (opts) { opts.mapFrom('destination'); })
          .forMember('ruleId', function (opts) { opts.mapFrom('ruleId'); })
          .forMember('ruleName', function (opts) { opts.mapFrom('ruleName'); })
          .forMember('isOCRAllowed', function (opts) { opts.mapFrom('isOCRAllowed'); })
          .forMember('isSRAllowed', function (opts) { opts.mapFrom('isSRAllowed'); })
          .forMember('size', function (opts) { opts.mapFrom('size'); })
          .forMember('files', function (opts) { opts.mapFrom('files'); })
          .forMember('iP', function (opts) { opts.mapFrom('iP'); })
          .forMember('requesterName', function (opts) { opts.mapFrom('requesterName'); })
          .forMember('status', function (opts) { opts.mapFrom('status'); })
          .forMember('statusName', function (opts) { opts.mapFrom('statusName'); });

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
      .createMap(payload, MetadataField_UpdateInputDTO)
      .forMember('metadataFieldId', function(opts) { opts.mapFrom('metadataFieldId'); })
      .forMember('fieldName', function(opts) { opts.mapFrom('fieldName'); })
      .forMember('metadataListId', function(opts) { opts.mapFrom('metadataListId'); })
      .forMember('fieldTypeId', function (opts) { opts.mapFrom('fieldTypeId'); });

    const request = automapper.map(payload, MetadataField_UpdateInputDTO, payload);

    console.log('AdminGroupsWebDataService - updateMetaDataField: ', request);

    return this.httpClient.put(requestUri, request).pipe(map(
      response => {
        automapper
          .createMap(MetadataField_UpdateInputDTO, MetadataFields)
          .forMember('metadataFieldId', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('metadataFieldId'))
          .forMember('fieldName', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('fieldName'))
          .forMember('metadataListId' , function (opts) { opts.mapFrom('metadataListId')})
          .forMember('fieldTypeId', function (opts) { opts.mapFrom('fieldTypeId'); });


        let _response = automapper.map(MetadataField_UpdateInputDTO, MetadataFields,  response);
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
}
