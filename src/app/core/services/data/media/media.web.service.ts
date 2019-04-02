import { MediaDataService } from './media.data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Media } from 'src/app/core/models/media';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class MediaWebDataService implements MediaDataService {
    private mockUrl = `./assets/mock/media-tile-view.json`;
    constructor(private httpClient: HttpClient) { }
    private paging_batch_size: number = 25;

    getMedias(): Observable<Media[]> {
        return this.httpClient.get<Media[]>(this.mockUrl);
    }
}
