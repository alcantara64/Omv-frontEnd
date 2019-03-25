import { AdminMediaAccessDataService } from './admin-media-access.data.service';
import { Member } from 'src/app/core/models/member';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MediaAccess } from 'src/app/core/models/media-access';
@Injectable({
    providedIn: 'root'
})
export class AdminMediaAccessMockDataService implements AdminMediaAccessDataService {
/**
 *
 */
constructor(private httpClient:HttpClient) {
    
}
    getMedias(): Observable<MediaAccess > {
        var mockUrl = `./assets/mock/admin-media-access.json`;
        var data = this.httpClient.get<MediaAccess >(mockUrl);
        return data;
    }   
     getMediasByGroupId(groupid: number) {
        throw new Error("Method not implemented.");
    }

}
