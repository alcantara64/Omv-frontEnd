import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetadataListDataService } from '../../data/metadata-list/metadata-list.data.service';

@Injectable({
  providedIn: 'root'
})
export class MetadataListService {

  constructor(private metadataListDataService: MetadataListDataService) { }

  getList(listId: number): Observable<any> {
    return this.metadataListDataService.getList(listId);
  }
}
