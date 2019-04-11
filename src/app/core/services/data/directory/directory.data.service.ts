import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Metadata } from 'src/app/core/models/entity/metadata';

@Injectable({
  providedIn: 'root'
})
export abstract class DirectoryDataService {

  constructor() { }

  abstract getDirectories(): Observable<any[]>;
  abstract getMetadata(directoryId: number): Observable<Metadata[]>;
}