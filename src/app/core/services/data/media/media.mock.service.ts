import { MediaDataService } from './media.data.service';
import { Injectable } from '@angular/core';
import { Media } from 'src/app/core/models/media';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MediaMockService implements MediaDataService {
    private mockUrl = `./assets/mock/media-tile-view.json`;

    constructor(private httpClient: HttpClient) { }

    getMedias(): Observable<Media[]> {
        return this.httpClient.get<Media[]>(this.mockUrl);
    }
}
