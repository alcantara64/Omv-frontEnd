import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { MetadataFieldsDataService } from './metadata-fields.data.service';
import { environment } from 'src/environments/environment';
import * as automapper from 'automapper-ts';

@Injectable({
    providedIn: 'root'
})
export class MetadataFieldsWebDataService implements MetadataFieldsDataService {

  constructor(private httpClient: HttpClient) { }
    
  getListItems(listId: number): Observable<any[]> {
      var requestUri = environment.api.baseUrl + `/v1/metadatafields/${listId}/listitems`;

      return of([]);

    return this.httpClient.get<any[]>(requestUri).pipe(
      map(response => {
        automapper
          .createMap(response, {})
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

        var _response = automapper.map(response, {}, response);
        
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
