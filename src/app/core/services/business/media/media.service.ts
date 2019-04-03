import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Media} from "../../../models/entity/media";
import {MediaDataService} from "../../data/media/media.data.service";

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private MediaDataService: MediaDataService) { }

  getMedia(): Observable<Media[]> {
    return this.MediaDataService.getMedia();
  }
}
