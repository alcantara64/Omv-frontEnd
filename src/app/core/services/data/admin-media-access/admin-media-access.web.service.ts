import { AdminMediaAccessDataService } from './admin-media-access.data.service';
import { Member } from 'src/app/core/models/member';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MediaAccess } from 'src/app/core/models/media-access';
@Injectable({
    providedIn: 'root'
})
export class AdminMediaAccessWebDataService implements AdminMediaAccessDataService {

    getMedias(): Observable<MediaAccess > {
        throw new Error("Method not implemented.");
    }   
     getMediasByGroupId(groupid: number) {
        throw new Error("Method not implemented.");
    }

}
