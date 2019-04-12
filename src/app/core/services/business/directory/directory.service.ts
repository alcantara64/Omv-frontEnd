import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DirectoryDataService } from '../../data/directory/directory.data.service';
import { Metadata } from 'src/app/core/models/entity/metadata';
import { Document } from 'src/app/core/models/entity/document';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  constructor(private directoryDataService: DirectoryDataService) { }

  getDirectories(): Observable<any[]> {
    return this.directoryDataService.getDirectories();
  }

  getMetadata(directoryId: number): Observable<Metadata[]> {
    return this.directoryDataService.getMetadata(directoryId);
  }

  getDocuments(): Observable<Document[]> {
    return this.directoryDataService.getDocuments();
  }

}
