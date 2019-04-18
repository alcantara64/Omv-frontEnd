import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import { MetadataFields } from 'src/app/core/models/entity/metadata-fields';
import { MetadataList } from 'src/app/core/models/entity/metadata-list';

@Injectable({
    providedIn: 'root'
})
export abstract class AdminMediaDataService {

    abstract getUploadHistory(): Observable<UploadHistory[]>;
    abstract getMetaDataFields(): Observable<MetadataFields[]>;
    abstract removeMetadataField(id: number);
    abstract createMetadataField(payload: MetadataFields): Observable<MetadataFields>;
    abstract getMetaDataLists(): Observable<MetadataList[]>;
    abstract removeMetadataList(id: number);
    abstract createMetadataList(payload: MetadataList): Observable<MetadataList>;
    abstract updateMetadataList(id: number, payload: MetadataList);
}