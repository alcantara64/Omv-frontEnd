import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Media } from "../../../models/entity/media";
import { History } from 'src/app/core/models/entity/history';

@Injectable({
    providedIn: 'root'
})
export abstract class MediaDataService {

    constructor() { }

    abstract getMedia(): Observable<Media[]>; 
    abstract getHistory(id: number): Observable<History[]>;
}
