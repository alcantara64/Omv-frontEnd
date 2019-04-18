import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import { MetadataFields } from 'src/app/core/models/entity/metadata-fields';

@Injectable({
    providedIn: 'root'
})
export abstract class AdminMediaDataService {

    abstract getUploadHistory(): Observable<UploadHistory[]>;
    abstract getMetaDataFields(): Observable<MetadataFields[]>;
    abstract removeMetadataField(id: number);
    abstract createMetadataField(payload: MetadataFields): Observable<MetadataFields>;
    abstract getNewUploads(): Observable<UploadHistory[]>;
    abstract getUploadRequest(id: number): Observable<any>;
    abstract approveUploads(id:number);
    abstract rejectUploads(id:number);
    abstract updateMetaDataField(id:number, payload: MetadataFields);
}