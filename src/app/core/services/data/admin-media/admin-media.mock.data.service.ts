import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import { Observable } from 'rxjs';
import { AdminMediaDataService } from './admin-media.data.service';
import { MetadataFields } from 'src/app/core/models/entity/metadata-fields';
import { map } from 'rxjs/operators';
import { MetadataLists } from 'src/app/core/models/entity/metadata-list';

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

  getMetaDataLists(): Observable<MetadataLists[]> {
    var url = `./assets/mock/admin-metadata-list.json`;
    let data = this.httpClient.get<MetadataLists[]>(url);
    console.log('data', data);
    return data;
  }

  removeMetadataList(id: number) {
    var url = `./assets/mock/admin-metadata-list.json`;

    return this.httpClient.get<MetadataLists[]>(url);
    // return data;
  }

  createMetadataList(payload: MetadataLists): Observable<MetadataLists> {
    var url = `./assets/mock/admin-metadata-list.json`;
    var data = this.httpClient.get<MetadataLists[]>(url).pipe(map(list => {
      var _list = new MetadataLists();

      return _list;
    }));
    return data;
  }
}

