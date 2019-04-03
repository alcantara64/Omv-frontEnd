import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaTileView } from 'src/app/core/models/media';
import { Media } from 'src/app/core/models/entity/media';

@Injectable({
    providedIn: 'root'
})
export abstract class MediaDataService {

    constructor() { }

    abstract getMedia(): Observable<Media[]>;
    abstract getAllMedia(): Observable<MediaTileView[]>;
}
