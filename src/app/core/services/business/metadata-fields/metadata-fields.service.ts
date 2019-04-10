import { Injectable } from '@angular/core';
import { MetadataFieldsDataService } from '../../data/metadata-fields/metadata-fields.data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetadataFieldsService {

  constructor(private metadataFieldsService: MetadataFieldsDataService) { }

  getListItems(listId: number): Observable<any[]> {
    return this.metadataFieldsService.getListItems(listId);
  }
}
