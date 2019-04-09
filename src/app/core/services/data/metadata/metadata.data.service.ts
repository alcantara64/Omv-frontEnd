import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export abstract class MetadataDataService {

    constructor() { }
    
    abstract getListOptions(id: number): Observable<any[]>;
}
