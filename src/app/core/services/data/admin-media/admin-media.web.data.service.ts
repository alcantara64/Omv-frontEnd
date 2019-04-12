import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import { Observable, of } from 'rxjs';
import { AdminMediaDataService } from './admin-media.data.service';
import { catchError, map } from 'rxjs/operators';
import { UploadRequestHistory_GetAllOutputDTO } from 'src/app/core/dtos/output/uploads/UploadRequestHistory_GetAllOutputDTO';
import { environment } from 'src/environments/environment';

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
      var requestUri = environment.api.baseUrl + `/v1/uploadrequests/1/history`;

      return this.httpClient.get<UploadRequestHistory_GetAllOutputDTO[]>(requestUri).pipe(map(
        response => {
          automapper
            .createMap(UploadRequestHistory_GetAllOutputDTO, UploadHistory)
            .forMember('id', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('uploadRequestHistoryId'))
            .forMember('status', function(opts) { opts.mapFrom('status'); })
            .forMember('createdOn', function(opts) { opts.mapFrom('createdOn'); })
            .forMember('createdBy', function(opts) { opts.mapFrom('createdBy'); })
            .forMember('modifiedOn', function(opts) { opts.mapFrom('modifiedOn'); })
            .forMember('modifiedBy', function(opts) { opts.mapFrom('modifiedBy'); });
  
          let _response = automapper.map(UploadRequestHistory_GetAllOutputDTO, UploadHistory, response);
          console.log('AdminMediaWebDataService - getUploadHistory: ', _response);
          return _response;
        }),
        catchError(e => {
          console.log("AdminMediaWebDataService - getUploadHistory error: ", e);
          return of(null);
        })
      );
    }
      
  }