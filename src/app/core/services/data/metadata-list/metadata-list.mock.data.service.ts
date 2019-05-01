import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { MetadataListDataService } from './metadata-list.data.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MetadataMockListDataService implements MetadataListDataService {

  constructor(private httpClient: HttpClient) { }

  getList(listId: number): Observable<any> {
    let url = `./assets/mock/metadata-list.json`;

    return this.httpClient.get<any>(url).pipe(
      map(response => {
        console.log('MetadataMockListDataService - getList response : ', response);
        return response;
      })
    );
  }
}