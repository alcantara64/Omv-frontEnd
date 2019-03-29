import { AdminMediaAccessDataService } from './admin-media-access.data.service';
import { Member } from 'src/app/core/models/member';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MediaAccess } from 'src/app/core/models/media-access';
import { Role_GetDirectory } from 'src/app/core/dtos/output/roles/Role_GetDirectory';
import { Role_GetDirectoriesByIdOutputDTO } from 'src/app/core/dtos/output/roles/Role_GetDirectoriesByIdOutputDTO';
@Injectable({
    providedIn: 'root'
})
export class AdminMediaAccessMockDataService implements AdminMediaAccessDataService {
    updateMediaAccess(groupid: number, payload: number[]) {
        throw new Error("Method not implemented.");
    }

    constructor(private httpClient: HttpClient) {

    }
    getMedias(): Observable<MediaAccess[]> {
        var mockUrl = `./assets/mock/admin-media-access.json`;
        var data = this.httpClient.get<MediaAccess[]>(mockUrl);
        return data;
    }
    getMediaAccessIds(groupid: number): Observable<Role_GetDirectoriesByIdOutputDTO[]> {
        var mockUrl = `./assets/mock/admin-media-access.json`;
        var data = this.httpClient.get<Role_GetDirectoriesByIdOutputDTO[]>(mockUrl);
        return data;
    }
}
