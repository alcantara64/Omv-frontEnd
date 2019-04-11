import { Injectable } from '@angular/core';
import { MetadataFieldsDataService } from '../../data/metadata-fields/metadata-fields.data.service';
import { Observable } from 'rxjs';
import { ListItem } from 'src/app/core/models/entity/list-item';

@Injectable({
  providedIn: 'root'
})
export class MetadataFieldsService {

  constructor(private metadataFieldsService: MetadataFieldsDataService) { }

  getListItems(listId: number): Observable<ListItem[]> {
    return this.metadataFieldsService.getListItems(listId);
  }
}
