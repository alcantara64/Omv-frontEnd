import { DirectoryDataService } from './directory.data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DirectoryMockDataService implements DirectoryDataService {
  
  constructor(private httpClient: HttpClient) {}

  
  getDirectories(): Observable<any[]> {
    var mockUrl = `./assets/mock/directories.json`;
    var data = this.httpClient.get<any[]>(mockUrl);
    return data;
  }
}