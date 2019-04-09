import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MetadataDataService } from './metadata.data.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MetadataWebDataService implements MetadataDataService {

    constructor(private httpClient: HttpClient) { }
    
    getListOptions(id: number): Observable<any[]> {
      var url = `./assets/mock/metadata-list.json`;
      let data = this.httpClient.get<any[]>(url).pipe(
        map(options => {
          return options.filter(x => x.optionsId === id);
        })
      );
      return data;
    }
}
