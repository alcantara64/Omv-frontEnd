import { AdminMediaAccessDataService } from './admin-media-access.data.service';
import { Member } from 'src/app/core/models/member';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MediaAccess } from 'src/app/core/models/media-access';
import { Role_GetDirectory } from 'src/app/core/dtos/output/roles/Role_GetDirectory';
@Injectable({
    providedIn: 'root'
})
export class AdminMediaAccessMockDataService implements AdminMediaAccessDataService {
    getMediasHiearachial(): Observable<MediaAccess[]> {
        var mockUrl = `./assets/mock/admin-media-access-hierarchy.json`;
        var data = this.httpClient.get<MediaAccess[] >(mockUrl);
        return data;
        }
/**
 *
 */
constructor(private httpClient:HttpClient) {
    
}
getMedias(): Observable<MediaAccess[]> {
    var mockUrl = `./assets/mock/admin-media-access.json`;
    var data = this.httpClient.get<MediaAccess[] >(mockUrl);
    return data;
}   
    // getMedias(): Observable<Role_GetDirectory []> {
    //     var mockUrl = `./assets/mock/admin-media-access.json`;
    //     var data = this.httpClient.get<Role_GetDirectory[] >(mockUrl);
    //     return data;
    // }   
     getMediasByGroupId(groupid: number) {
        throw new Error("Method not implemented.");
    }

}
