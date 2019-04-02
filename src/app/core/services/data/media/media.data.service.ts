
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Media } from 'src/app/core/models/media';


@Injectable({
    providedIn: 'root'
})
export abstract class MediaDataService {

    abstract getMedias(): Observable<Media[]>;
}
