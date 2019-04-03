import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Media } from "../../../models/entity/media";

@Injectable({
    providedIn: 'root'
})
export abstract class MediaDataService {

    constructor() { }

    abstract getMedia(): Observable<Media[]>;
}
