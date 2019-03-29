import { AdminMediaAccessDataService } from './admin-media-access.data.service';
import { Member } from 'src/app/core/models/member';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MediaAccess } from 'src/app/core/models/media-access';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Role_GetDirectory } from 'src/app/core/dtos/output/roles/Role_GetDirectory';
@Injectable({
    providedIn: 'root'
})
export class AdminMediaAccessWebDataService implements AdminMediaAccessDataService {
    // getMedias(): Observable<MediaAccess[]> {
    //     var mockUrl = `./assets/mock/admin-media-access.json`;
    //     var data = this.httpClient.get<MediaAccess[] >(mockUrl);
    //     return data;
    // }
    getMediasHiearachial(): Observable<MediaAccess[]> {
        var mockUrl = `./assets/mock/admin-media-access-hierarchy.json`;
        var data = this.httpClient.get<MediaAccess[] >(mockUrl);
        return data;
    }
/**
 *
 */
constructor(private httpClient: HttpClient) {
    
}
    getMedias(): Observable<any[] > {
        var requestUri = environment.api.baseUrl + `/v1/directories`;
        var data = this.httpClient.get<any[] >(requestUri);
        return data;
       // throw new Error("Method not implemented.");
    }   
     getMediasByGroupId(groupid: number) {
        throw new Error("Method not implemented.");
    }

}
