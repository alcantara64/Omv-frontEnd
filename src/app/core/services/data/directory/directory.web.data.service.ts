import { DirectoryDataService } from './directory.data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirectoryWebDataService implements DirectoryDataService {
  
  constructor(private httpClient: HttpClient) {}
  
  getDirectories(): Observable<any[]> {
    var mockUrl = `./assets/mock/directories.json`;
    var data = this.httpClient.get<any[]>(mockUrl);
    return data;
  }
  
  getMetadata(id: number): Observable<any[]> {
    var url = `./assets/mock/metadata.json`;
    let data = this.httpClient.get<any[]>(url);
    return data;
  }
}