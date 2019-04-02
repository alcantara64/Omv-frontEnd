import { Injectable } from '@angular/core';
import { MediaDataService } from '../../data/media/media.data.service';
import { Observable } from 'rxjs';
import { Media } from 'src/app/core/models/media';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private mediaService: MediaDataService) { }

  getUsers(): Observable<Media[]> {
    return this.mediaService.getMedias();
  }
}
