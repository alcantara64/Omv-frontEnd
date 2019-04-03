
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/core/models/member';
import { MediaAccess } from 'src/app/core/models/media-access';
import { Role_GetDirectory } from 'src/app/core/dtos/output/roles/Role_GetDirectory';
import { Role_GetDirectoriesByIdOutputDTO } from 'src/app/core/dtos/output/roles/Role_GetDirectoriesByIdOutputDTO';

@Injectable({
    providedIn: 'root'
})
export abstract class AdminMediaAccessDataService {

    constructor() { }

    abstract getMedias(): Observable<any[]>;
    abstract getMediaAccessIds(groupid: number): Observable<Role_GetDirectoriesByIdOutputDTO[]>;
    abstract updateMediaAccess(groupid: number, payload:number[]);
}