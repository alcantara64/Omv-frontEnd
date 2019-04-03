import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Media} from "../../../models/entity/media";
import {MediaDataService} from "../../data/media/media.data.service";
import { History } from 'src/app/core/models/entity/history';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private MediaDataService: MediaDataService) { }

  getMedia(): Observable<Media[]> {
    return this.MediaDataService.getMedia();
  }
  
  getHistory(id: number): Observable<History[]> {
    return this.MediaDataService.getHistory(id);
  }

}
