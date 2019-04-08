import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DirectoryDataService } from '../../data/directory/directory.data.service';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  constructor(private directoryDataService: DirectoryDataService) { }

  getDirectories(): Observable<any[]> {
    return this.directoryDataService.getDirectories();
  }
}
