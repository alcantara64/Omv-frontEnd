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
}