import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MetadataFieldsDataService } from './metadata-fields.data.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MetadataFieldsMockDataService implements MetadataFieldsDataService {

    constructor(private httpClient: HttpClient) { }
    
    getListItems(id: number): Observable<any[]> {
      var url = `./assets/mock/metadata-list.json`;
      let data = this.httpClient.get<any[]>(url).pipe(
        map(options => {
          return options.filter(x => x.optionsId === id);
        })
      );
      return data;
    }
}
