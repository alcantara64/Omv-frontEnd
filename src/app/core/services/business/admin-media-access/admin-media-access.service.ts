import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaAccess } from 'src/app/core/models/media-access';
import { AdminMediaAccessDataService } from '../../data/admin-media-access/admin-media-access.data.service';

@Injectable({
  providedIn: 'root'
})
export class AdminMediaAccessService {

  constructor(private adminMediaAccessService: AdminMediaAccessDataService) { }

  getMediaAccess(): Observable<MediaAccess> {
    return this.adminMediaAccessService.getMedias();
  }

}
