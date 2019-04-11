import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { MetadataFieldsDataService } from './metadata-fields.data.service';
import { environment } from 'src/environments/environment';
import * as automapper from 'automapper-ts';
import { MetadataField_GetListItemByIdOutputDTO } from 'src/app/core/dtos/output/metadata/MetadataField_GetListItemByIdOutputDTO';
import { ListItem } from 'src/app/core/models/entity/list-item';

@Injectable({
    providedIn: 'root'
})
export class MetadataFieldsWebDataService implements MetadataFieldsDataService {

  constructor(private httpClient: HttpClient) { }
    
  getListItems(listId: number): Observable<ListItem[]> {
    var requestUri = environment.api.baseUrl + `/v1/metadatafields/${listId}/listItems`;

    return this.httpClient.get<MetadataField_GetListItemByIdOutputDTO[]>(requestUri).pipe(
      map(response => {
        automapper
          .createMap(response, MetadataField_GetListItemByIdOutputDTO)
          .forMember('value', function(opts) { opts.mapFrom('itemValue'); })
          .forMember('description', function(opts) { opts.mapFrom('itemDescription'); })
          .forMember('sort', function(opts) { opts.mapFrom('itemSort'); });

        var _response = automapper.map(response, MetadataField_GetListItemByIdOutputDTO, response);
        
        console.log('MetadataFieldsWebDataService - getListItems: ', _response);
        return _response;
      }),
      catchError(e => {
        console.log("'MetadataFieldsWebDataService - getListItems error:", e);
        return of(null);
      })
    );
  }
}
