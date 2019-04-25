import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import { AdminMediaDataService } from '../../data/admin-media/admin-media.data.service';
import { MetadataFields } from 'src/app/core/models/entity/metadata-fields';
import { MetadataList } from 'src/app/core/models/entity/metadata-list';
import { MetadataListItem } from 'src/app/core/models/entity/metadata-list-item';
import { MetadataDetail } from 'src/app/core/models/entity/metadata-detail';

@Injectable({
  providedIn: 'root'
})
export class AdminMediaService {

  constructor(private AdminMediaDataService: AdminMediaDataService) { }

  getUploadHistory(): Observable<UploadHistory[]> {
    return this.AdminMediaDataService.getUploadHistory();
  }

  getUploadRequest(id: number): Observable<any> {
    return this.AdminMediaDataService.getUploadRequest(id);
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

  getMetadataListsItem(): Observable<MetadataListItem[]> {
    return this.AdminMediaDataService.getMetaDataListsItem();
  }
  getMetaDataListItemById(id:number): Observable<MetadataListItem[]> {
    return this.AdminMediaDataService.getMetaDataListItemById(id);
  }
  removeMetadataListItem(id: number, metadataListItemId:number): Observable<MetadataListItem[]> {
    return this.AdminMediaDataService.removeMetadataListItem(id, metadataListItemId)
  }
  createMetaDataListItem(id:number, payload: MetadataListItem){
    return this.AdminMediaDataService.createMetadataListItem(id,payload)
  }
  updateMetadataListItem(id: number, payload: MetadataDetail) {
    return this.AdminMediaDataService.updateMetadataListItem(id,payload);
  }
  getMetadataListById(id): Observable<MetadataList> {
    return this.AdminMediaDataService.getMetaDataListById(id);
  }
  getMetadataDetail(id:number): Observable<MetadataDetail>{
    return this.AdminMediaDataService.getMetaDataListsDetail(id);
  }
}
