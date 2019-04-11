import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import { Observable } from 'rxjs';
import { AdminMediaDataService } from './admin-media.data.service';

@Injectable({
    providedIn: 'root'
  })

  export  class AdminMediaMockDataService implements AdminMediaDataService {

    constructor(private httpClient: HttpClient) { }

    getUploadHistory(): Observable<UploadHistory[]> {
        var url = `./assets/mock/admin-media-uploads-history.json`;
        let data = this.httpClient.get<UploadHistory[]>(url);
        return data;
      }
  }