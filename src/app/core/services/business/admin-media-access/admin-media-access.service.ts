import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaAccess } from 'src/app/core/models/media-access';
import { AdminMediaAccessDataService } from '../../data/admin-media-access/admin-media-access.data.service';
import { Role_GetDirectory } from 'src/app/core/dtos/output/roles/Role_GetDirectory';
import { Role_GetDirectoriesByIdOutputDTO } from 'src/app/core/dtos/output/roles/Role_GetDirectoriesByIdOutputDTO';

@Injectable({
  providedIn: 'root'
})
export class AdminMediaAccessService {

  constructor(private adminMediaAccessService: AdminMediaAccessDataService) { }

  getMediaAccessIds(groupId): Observable<Role_GetDirectoriesByIdOutputDTO[]>{
    return this.adminMediaAccessService.getMediaAccessIds(groupId);
  }
  getMediaAccess(): Observable<any> {
    return this.adminMediaAccessService.getMedias();
  }
  updateMediaAccess(id: number, payload: number[]) {
    return this.adminMediaAccessService.updateMediaAccess(id, payload);
  }
}
