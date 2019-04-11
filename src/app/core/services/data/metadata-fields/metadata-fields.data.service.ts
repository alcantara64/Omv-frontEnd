import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListItem } from 'src/app/core/models/entity/list-item';

@Injectable({
    providedIn: 'root'
})
export abstract class MetadataFieldsDataService {

    constructor() { }
    
    abstract getListItems(listId: number): Observable<ListItem[]>;
}
