import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import { AdminMediaDataService } from '../../data/admin-media/admin-media.data.service';
import { MetadataFields } from 'src/app/core/models/entity/metadata-fields';
import { MetadataList } from 'src/app/core/models/entity/metadata-list';

@Injectable({
  providedIn: 'root'
})
export class AdminMediaService {

  constructor(private AdminMediaDataService: AdminMediaDataService) { }

  getUploadHistory(): Observable<UploadHistory[]> {
    return this.AdminMediaDataService.getUploadHistory();
  }
  getMetadataField(): Observable<MetadataFields[]> {
    return this.AdminMediaDataService.getMetaDataFields();
  }
  removeMetadataField(id: number): Observable<MetadataFields[]> {
    return this.AdminMediaDataService.removeMetadataField(id);
  }
  createMetaDataField(payload: MetadataFields){
    return this.AdminMediaDataService.createMetadataField(payload);
  }
  getMetadataList(): Observable<MetadataList[]> {
    return this.AdminMediaDataService.getMetaDataLists();
  }
  removeMetadataList(id: number): Observable<MetadataList[]> {
    return this.AdminMediaDataService.removeMetadataList(id);
  }
  createMetaDataList(payload: MetadataList){
    return this.AdminMediaDataService.createMetadataList(payload);
  }
  updateMetadataList(id: number, payload: MetadataList) {
    return this.AdminMediaDataService.updateMetadataList(id, payload);
  }
}
