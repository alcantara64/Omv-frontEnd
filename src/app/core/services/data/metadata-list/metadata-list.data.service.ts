import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class MetadataListDataService {
  constructor() { }

  abstract getList(listId: number): Observable<any>;
}