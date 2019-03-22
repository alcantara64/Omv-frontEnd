import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminGroupsDataService } from "./admin-groups.data.service";
import { Observable } from "rxjs";
import { Group } from "src/app/core/models/group";

@Injectable({
  providedIn: "root"
})
export class AdminGroupsMockDataService implements AdminGroupsDataService {
  mockUrl = `./assets/mock/admin-groups.json`;
  constructor(private httpClient: HttpClient) {}

  getGroups(): Observable<Group[]> {
    return this.httpClient.get<Group[]>(this.mockUrl);
  }

  getGroup(id: number): Observable<Group> {
    return this.httpClient.get<Group>(`${this.mockUrl}/${id}`);
  }

  disableGroup(id: number, payload: Group) {
    payload.status = 0;
    return this.httpClient.put<any>(`${this.mockUrl}/${id}`, payload);
  }
  enableGroup(id: number, payload: Group) {
    payload.status = 1;
    return this.httpClient.put<any>(`${this.mockUrl}/${id}`, payload);
  }
  
  updateGroup(id: number, payload: Group) {
    return this.httpClient.put<any>(`${this.mockUrl}/${id}`, payload);
  }
}
