import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class DirectoryDataService {

  constructor() { }

  abstract getDirectories(): Observable<any[]>;
  abstract getMetadata(id: number): Observable<any[]>;
}