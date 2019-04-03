import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {MediaDataService} from "../../data/media/media.data.service";
import { Media } from 'src/app/core/models/entity/media';
import { MediaTileView } from 'src/app/core/models/media';
@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private MediaDataService: MediaDataService) { }

  getMedia(): Observable<Media[]> {
    return this.MediaDataService.getMedia();
  }

  getAllMedia(): Observable<MediaTileView[]> {
    return this.MediaDataService.getAllMedia();
  }
}
