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
    return null;
  }
}