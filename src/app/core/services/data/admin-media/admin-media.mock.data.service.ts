import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import { Observable } from 'rxjs';
import { AdminMediaDataService } from './admin-media.data.service';
import { MetadataFields } from 'src/app/core/models/entity/metadata-fields';
import { map } from 'rxjs/operators';
import { MetadataList } from 'src/app/core/models/entity/metadata-list';
import { MetadataListItem } from 'src/app/core/models/entity/metadata-list-item';
import { MetadataDetail } from 'src/app/core/models/entity/metadata-detail';
import { MetadataFieldType } from 'src/app/core/models/entity/metadata-fieldtype';

@Injectable({
  providedIn: 'root'
})

export class AdminMediaMockDataService implements AdminMediaDataService {


  constructor(private httpClient: HttpClient) { }

  getUploadHistory(): Observable<UploadHistory[]> {
    var url = `./assets/mock/admin-media-uploads-history.json`;
    let data = this.httpClient.get<UploadHistory[]>(url);
    return data;
  }
  getMetaDataFields(): Observable<MetadataFields[]> {
    var url = `./assets/mock/admin-metadata-fields.json`;
    let data = this.httpClient.get<MetadataFields[]>(url);
    console.log('data', data);
    return data;
  }

  removeMetadataField(id: number) {
    var url = `./assets/mock/admin-metadata-fields.json`;

    return this.httpClient.get<MetadataFields[]>(url);
    // return data;
  }

  createMetadataField(payload: MetadataFields): Observable<MetadataFields> {
    var url = `./assets/mock/admin-metadata-fields.json`;
    var data = this.httpClient.get<MetadataFields[]>(url).pipe(map(field => {
      var _field = new MetadataFields();

      return _field;
    }));
    return data;
  }

  getMetaDataLists(): Observable<MetadataList[]> {
    var url = `./assets/mock/admin-metadata-list.json`;
    let data = this.httpClient.get<MetadataList[]>(url);
    console.log('data', data);
    return data;
  }

  removeMetadataList(id: number) {
    var url = `./assets/mock/admin-metadata-list.json`;
    return this.httpClient.get<MetadataList[]>(url);
    // return data;
  }

  createMetadataList(payload: MetadataList): Observable<MetadataList> {
    var url = `./assets/mock/admin-metadata-list.json`;
    var data = this.httpClient.get<MetadataList[]>(url).pipe(map(list => {
      var _list = new MetadataList();
      console.log('AdminMediaMockDataService - createMetadataList : ', payload);
      return payload;
    }));
    return data;
  }
  updateMetadataList(id: number, payload: MetadataList) {
    var mockUrl = `./assets/mock/admin-metadata-list.json`;
    return this.httpClient.get<MetadataList[]>(mockUrl);
  }
  disableMetadaList(id: number, payload: MetadataList) {
    payload.status = 0;
    var mockUrl = `./assets/mock/admin-metadata-list.json`;
    return this.httpClient.put<any>(`${mockUrl}`, payload);
  }

  enableGroup(id: number, payload: MetadataList) {
    payload.status = 1;
    var mockUrl = `./assets/mock/admin-metadata-list.json`;
    return this.httpClient.put<any>(`${mockUrl}`, payload);
  }

  getNewUploads(): Observable<UploadHistory[]> {
    var url = `./assets/mock/media-new-uploads.json`;
    let data = this.httpClient.get<UploadHistory[]>(url);
    console.log('data', data);
    return data;
  }



  getUploadRequestById(id: number): Observable<any> {
    throw new Error("Method not implemented.");
  }

  getMetaDataListsItem(): Observable<MetadataListItem[]> {
    var url = `./assets/mock/admin-metadata-list-item.json`;
    let data = this.httpClient.get<MetadataListItem[]>(url);
    console.log('data', data);
    return data;
  }

  getMetaDataListItemById(id:number): Observable<MetadataListItem[]> {
    var url = `./assets/mock/admin-metadata-list-item.json`;
    let data = this.httpClient.get<MetadataListItem[]>(url);
    console.log('data', data);
    return data;
  }

  removeMetadataListItem(id: number,  metadataListItemId:number) {
    var url = `./assets/mock/admin-metadata-list-item.json`;
    return this.httpClient.get<MetadataListItem[]>(url);
    // return data;
  }

  createMetadataListItem(id:number, payload: MetadataListItem): Observable<MetadataListItem> {
    var url = `./assets/mock/admin-metadata-list-item.json`;
    var data = this.httpClient.get<MetadataListItem[]>(url).pipe(map(list => {
      var _list = new MetadataListItem();
      console.log('AdminMediaMockDataService - createMetadataListItem : ', payload);
      return payload;
    }));
    return data;
  }
  updateMetadataListItem(id: number, payload: MetadataDetail) {
    var mockUrl = `./assets/mock/admin-metadata-list-item.json`;
    return this.httpClient.get<MetadataListItem[]>(mockUrl);
  }  

  getMetaDataListById(id: number): Observable<MetadataList> {
    var url = `./assets/mock/admin-metadata-list.json`;
    let data = this.httpClient.get<MetadataList[]>(url).pipe(
      map(resp => {
        return resp.find( element => element.id === id);
      })
    );
    return data;
    
  }
  getMetaDataListsDetail(id: number): Observable<MetadataDetail> {
    throw new Error("Method not implemented.");
  }


  approveUploads(id: number) {
    throw new Error("Method not implemented.");
  }
  rejectUploads(id: number) {
    throw new Error("Method not implemented.");
  }
  updateMetaDataField(id: number, payload: MetadataFields) {
    var url = `./assets/mock/admin-metadata-fields.json`;
    let data = this.httpClient.get<MetadataFields[]>(url).pipe(map(fields => {
      fields.find(field => field.metadataFieldId === id);
    }));
    console.log('AdminMediaMockDataService - updateMetaDataField', data);
    return data;
  }
  getMetadataListById(id:number): Observable< MetadataList[]>{
    var url = `./assets/mock/admin-metadata-fields.json`;
    return this.httpClient.get<MetadataList[]>(url);

  }

  getMetadataFieldTypes(): Observable<MetadataFieldType[]> {
    throw new Error("Method not implemented.");
  }

}


