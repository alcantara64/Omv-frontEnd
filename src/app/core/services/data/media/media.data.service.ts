import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaTileView } from 'src/app/core/models/media';
import { MediaItem } from 'src/app/core/models/entity/media';
import { History } from 'src/app/core/models/entity/history';

@Injectable({
    providedIn: 'root'
})
export abstract class MediaDataService {

    constructor() { }

    abstract getMedia(): Observable<MediaItem[]>; 
    abstract getMediaItem(id: number): Observable<MediaItem>;
    abstract getHistory(id: number): Observable<History[]>;
}
