import { AdminMediaAccessDataService } from './admin-media-access.data.service';
import { Member } from 'src/app/core/models/member';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { MediaAccess } from 'src/app/core/models/media-access';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Role_GetDirectory } from 'src/app/core/dtos/output/roles/Role_GetDirectory';
import { Role_GetDirectoriesByIdOutputDTO } from 'src/app/core/dtos/output/roles/Role_GetDirectoriesByIdOutputDTO';
import { catchError } from 'rxjs/operators';
import { Role_InsertMediaAccessInputDTO } from 'src/app/core/dtos/input/roles/Role_InsertMediaAccessInputDTO';
@Injectable({
    providedIn: 'root'
})
export class AdminMediaAccessWebDataService implements AdminMediaAccessDataService {



    constructor(private httpClient: HttpClient) {

    }
    getMedias(): Observable<any[]> {
        var requestUri = environment.api.baseUrl + `/v1/directories`;
        var data = this.httpClient.get<any[]>(requestUri);
        return data;
    }
    getMediaAccessIds(groupid: number): Observable<Role_GetDirectoriesByIdOutputDTO[]> {
        var requestUri = environment.api.baseUrl + `/v1/roles/${groupid}/directories`;
        var data = this.httpClient.get<Role_GetDirectoriesByIdOutputDTO[]>(requestUri);
        return data;
    }
    updateMediaAccess(groupid: number, payload: number[]) {
        let requestUri = environment.api.baseUrl + `/v1/roles/${groupid}/directories`;
        var request = new Role_InsertMediaAccessInputDTO();
        request.DirectoryIds = payload;

    console.log('AdminGroupsWebDataService - updatePermissions: ', request);

        return this.httpClient.post(requestUri, request).pipe(
            catchError(e => {
                console.log('AdminGroupsWebDataService - addMembers error: ', e);
                return of(null);
            })
        );

    }
}
