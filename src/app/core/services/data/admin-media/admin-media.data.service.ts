import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import { MetadataFields } from 'src/app/core/models/entity/metadata-fields';
import { MetadataList } from 'src/app/core/models/entity/metadata-list';
import { MetadataListItem } from 'src/app/core/models/entity/metadata-list-item';
import { MetadataDetail } from 'src/app/core/models/entity/metadata-detail';

@Injectable({
    providedIn: 'root'
})
export abstract class AdminMediaDataService {

    abstract getUploadHistory(): Observable<UploadHistory[]>;
    abstract getUploadRequest(id: number): Observable<any>;
    abstract getMetaDataFields(): Observable<MetadataFields[]>;
    abstract removeMetadataField(id: number);
    abstract createMetadataField(payload: MetadataFields): Observable<MetadataFields>;

    abstract getMetaDataLists(): Observable<MetadataList[]>;
    abstract removeMetadataList(id: number);
    abstract createMetadataList(payload: MetadataList): Observable<MetadataList>;
    abstract updateMetadataList(id: number, payload: MetadataList);

    abstract getMetaDataListsItem(): Observable<MetadataListItem[]>;
    abstract getMetaDataListItemById(id:number): Observable<MetadataListItem[]>;
    abstract removeMetadataListItem(id: number,  metadataListItemId:number);
    abstract createMetadataListItem(id:number, payload: MetadataListItem): Observable<MetadataListItem>;
    abstract updateMetadataListItem(id: number, payload: MetadataDetail);
    abstract getMetaDataListById(id: number): Observable<MetadataList>;
    abstract getMetaDataListsDetail(id: number): Observable<MetadataDetail>
}