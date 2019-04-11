import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DirectoryDataService } from '../../data/directory/directory.data.service';
import { Metadata } from 'src/app/core/models/entity/metadata';

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
}
