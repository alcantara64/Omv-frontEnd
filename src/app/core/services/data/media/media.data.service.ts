import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaItem } from 'src/app/core/models/entity/media';
import { History } from 'src/app/core/models/entity/history';
import { MediaTreeGrid } from 'src/app/core/models/media-tree-grid';

@Injectable({
    providedIn: 'root'
})
export abstract class MediaDataService {

    constructor() { }

    abstract getMedia(pageNumber?: number, pageSize?: number): Observable<MediaItem[]>; 
    abstract getMediaItem(id: number): Observable<MediaItem>;    
    abstract createMediaItem(payload: MediaItem): Observable<any>;
    abstract updateMediaItem(id: any, payload: MediaItem): Observable<any>;
    abstract toggleFavorite(id: number, payload: MediaItem): Observable<any>; 
    abstract getHistory(id: string): Observable<History[]>;
    abstract getMediaTreeData(): Observable<MediaTreeGrid[]>;
    abstract getMetadata(id: number): Observable<any[]>;
    abstract getMetadataOptions(id: string): Observable<any[]>;
}
