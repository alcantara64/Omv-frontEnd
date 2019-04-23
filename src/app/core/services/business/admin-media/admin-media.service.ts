import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import { AdminMediaDataService } from '../../data/admin-media/admin-media.data.service';
import { MetadataFields } from 'src/app/core/models/entity/metadata-fields';
import { MetadataFieldType } from 'src/app/core/models/entity/metadata-fieldtype';

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
  getNewUploads(): Observable<UploadHistory[]>{
    return this.AdminMediaDataService.getNewUploads();
  }
  getUploadRequest(id: number): Observable<any> {
    return this.AdminMediaDataService.getUploadRequest(id);
  }
  rejectUploads(id: number){
    return this.AdminMediaDataService.rejectUploads(id);
  }
 approveUploads(id: number){
    return this.AdminMediaDataService.approveUploads(id);
  }
  updateMetaDataField(id:number, payload: MetadataFields){
    return this.AdminMediaDataService.updateMetaDataField(id, payload);
  }
  getMetadataList(id:number){
    return this.AdminMediaDataService.getMetadataListById(id);
  }
  getFieldTypes(): Observable<MetadataFieldType[]>{
    return this.AdminMediaDataService.getMetadataFieldTypes();
  }
}
