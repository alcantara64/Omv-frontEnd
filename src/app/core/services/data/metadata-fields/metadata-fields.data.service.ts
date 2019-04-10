import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export abstract class MetadataFieldsDataService {

    constructor() { }
    
    abstract getListItems(listId: number): Observable<any[]>;
}
