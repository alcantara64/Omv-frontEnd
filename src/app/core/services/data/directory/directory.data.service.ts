import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Metadata } from 'src/app/core/models/entity/metadata';
import { Document } from 'src/app/core/models/entity/document';

@Injectable({
  providedIn: 'root'
})
export abstract class DirectoryDataService {

  constructor() { }

  abstract getDirectories(): Observable<any[]>;
  abstract getMetadata(directoryId: number): Observable<Metadata[]>;
  abstract getDocuments(): Observable<Document[]>;
}