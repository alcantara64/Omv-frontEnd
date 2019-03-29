import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaAccess } from 'src/app/core/models/media-access';
import { AdminMediaAccessDataService } from '../../data/admin-media-access/admin-media-access.data.service';
import { Role_GetDirectory } from 'src/app/core/dtos/output/roles/Role_GetDirectory';

@Injectable({
  providedIn: 'root'
})
export class AdminMediaAccessService {

  constructor(private adminMediaAccessService: AdminMediaAccessDataService) { }

  getHierachialData(): Observable<MediaAccess []>{
    return this.adminMediaAccessService.getMediasHiearachial();
  }
  getMediaAccess(): Observable<any[]> {
    return this.adminMediaAccessService.getMedias();
  }

  // getMediaAccess(): Observable<Role_GetDirectory[]> {
  //   return this.adminMediaAccessService.getMedias();
  // }

}
