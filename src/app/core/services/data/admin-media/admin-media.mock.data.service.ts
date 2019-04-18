import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import { Observable } from 'rxjs';
import { AdminMediaDataService } from './admin-media.data.service';
import { MetadataFields } from 'src/app/core/models/entity/metadata-fields';
import { map } from 'rxjs/operators';

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

  getNewUploads(): Observable<UploadHistory[]> {
    var url = `./assets/mock/media-new-uploads.json`;
    let data = this.httpClient.get<UploadHistory[]>(url);
    console.log('data', data);
    return data;
  }



  getUploadRequest(id: number): Observable<any> {
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
}


