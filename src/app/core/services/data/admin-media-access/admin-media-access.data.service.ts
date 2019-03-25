
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/core/models/member';
import { MediaAccess } from 'src/app/core/models/media-access';

@Injectable({
    providedIn: 'root'
})
export abstract class AdminMediaAccessDataService {

    constructor() { }

    abstract getMedias(): Observable<MediaAccess>;
    abstract getMediasByGroupId(groupid: number);
}