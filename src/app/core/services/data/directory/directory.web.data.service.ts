import { DirectoryDataService } from './directory.data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Metadata } from 'src/app/core/models/entity/metadata';
import { map, catchError } from 'rxjs/operators';
import { MetadataSetting_GetAllOutputDTO } from 'src/app/core/dtos/output/metadata/MetadataSetting_GetAllOutputDTO';
import { environment } from 'src/environments/environment';
import * as automapper from 'automapper-ts';
import { Directory_GetAllOutputDTO } from 'src/app/core/dtos/output/directories/Directory_GetAllOutputDTO';
import { Directory } from 'src/app/core/models/entity/directory';

@Injectable({
  providedIn: 'root'
})
export class DirectoryWebDataService implements DirectoryDataService {

  baseUrl = environment.api.baseUrl;
  
  constructor(private httpClient: HttpClient) {}
  
  getDirectories(): Observable<any[]> {
    let requestUri = this.baseUrl + `/v1/directories`;
    var data = this.httpClient.get<Directory_GetAllOutputDTO[]>(requestUri).pipe(
      map(response => {
        automapper
          .createMap(response, Directory)
          .forMember('id', function(opts) { opts.mapFrom('directoryId'); })
          .forMember('name', function(opts) { opts.mapFrom('directoryName'); })
          .forMember('parentId', function(opts) { opts.mapFrom('directoryParentId'); })
          .forMember('hasChild', function(opts) { opts.mapFrom('hasChild'); });

        var _response = automapper.map(response, Directory, response);

        _response.forEach(item => {
          if (item.parentId == 0) {
            item.parentId = null;
          }
        })
        
        console.log('DirectoryWebDataService - getDirectories: ', _response);
        return _response;
      }),
      catchError(e => {
        console.log("'DirectoryWebDataService - getDirectories error:", e);
        return of(null);
      })
    );
    return data;
  }
  
  getMetadata(directoryId: number): Observable<Metadata[]> {
    var requestUri = environment.api.baseUrl + `/v1/directories/${directoryId}/metadatafields`;

    return this.httpClient.get<MetadataSetting_GetAllOutputDTO[]>(requestUri).pipe(
      map(response => {
        automapper
          .createMap(response, Metadata)
          .forMember('fieldId', function(opts) { opts.mapFrom('metadataFieldId'); })
          .forMember('fieldName', function(opts) { opts.mapFrom('fieldName'); })
          .forMember('listId', function(opts) { opts.mapFrom('metadataListId'); })
          .forMember('listName', function(opts) { opts.mapFrom('metadataListName'); })
          .forMember('fieldTypeId', function(opts) { opts.mapFrom('fieldTypeId'); })
          .forMember('fieldTypeName', function(opts) { opts.mapFrom('fieldTypeName'); })
          .forMember('entityId', function(opts) { opts.mapFrom('entityId'); })
          .forMember('entityName', function(opts) { opts.mapFrom('entityName'); })
          .forMember('isRequired', function(opts) { opts.mapFrom('isRequired'); })
          .forMember('order', function(opts) { opts.mapFrom('order'); })
          .forMember('status', function(opts) { opts.mapFrom('status'); });

        var _response = automapper.map(response, Metadata, response);
        
        console.log('DirectoryWebDataService - getMetadata: ', _response);
        return _response;
      }),
      catchError(e => {
        console.log("'DirectoryWebDataService - getMetadata error:", e);
        return of(null);
      })
    );
  }
}