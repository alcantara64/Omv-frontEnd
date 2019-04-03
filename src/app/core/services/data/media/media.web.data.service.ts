import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Media} from "../../../models/entity/media";
import {MediaDataService} from "./media.data.service";
import { map } from 'rxjs/operators';
import { History } from 'src/app/core/models/entity/history';

@Injectable({
  providedIn: 'root'
})
export class MediaWebDataService implements MediaDataService {
  
  getHistory(id: number): Observable<History[]> {
    throw new Error("Method not implemented.");
  }

  private paging_batch_size: number = 25;
  mockUrl = `./assets/mock/`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private httpClient: HttpClient) { }

  getMedia(): Observable<Media[]> {
    return null;
  } 

 
}
