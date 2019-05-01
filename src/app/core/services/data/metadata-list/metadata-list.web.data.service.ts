import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { MetadataListDataService } from './metadata-list.data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MetadataWebListDataService implements MetadataListDataService {

  constructor(private httpClient: HttpClient) { }
    
  getList(listId: number): Observable<any> {
    throw new Error("Method not implemented.");
  }
}