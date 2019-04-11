import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import { Observable } from 'rxjs';
import { AdminMediaDataService } from './admin-media.data.service';

@Injectable({
    providedIn: 'root'
  })

  export class AdminMediaWebDataService implements AdminMediaDataService {

    private paging_batch_size: number = 25;
    mockUrl = `./assets/mock/`;
  
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    
    constructor(private httpClient: HttpClient) { }

    getUploadHistory(): Observable<UploadHistory[]> {
        return null;
      } 
  }