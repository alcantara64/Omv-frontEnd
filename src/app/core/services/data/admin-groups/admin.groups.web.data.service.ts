import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { User } from "src/app/core/models/User";
import { AdminGroupsDataService } from "./admin-groups.data.service";
import { Group } from "src/app/core/models/group";
import { Role_GetAllOutputDTO } from "src/app/core/dtos/role-get-all-output.dto";
import { environment } from "src/environments/environment";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AdminGroupsWebDataService implements AdminGroupsDataService {

  private paging_batch_size: number = 25;

  httpOptions = {
    headers: new HttpHeaders({
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "-1"
    })
  };

  constructor(private httpClient: HttpClient) {}

  getGroups(): Observable<Role_GetAllOutputDTO[]> {
    var requestUri = environment.api.baseUrl + `/v1/roles`;
    console.log("trade item endpoint", requestUri);

    return this.httpClient.get<Role_GetAllOutputDTO[]>(requestUri, this.httpOptions)
          .pipe(
            map(response => response),
            catchError(e => {
              console.log("error trying to retrieve roles ", e);
              return of(null);
            })
          );
  }
  getGroupPermissions(groupId: number): Observable<import("../../../enum/permission").Permission[]> {
    throw new Error("Method not implemented.");
}
  getGroup(id: number): Observable<Group> {
    return null;
  }
  createGroup(payload: Group): Observable<Group> {
    throw new Error("Method not implemented.");
  }
  disableGroup(id: number, payload: Group) {
    throw new Error("Method not implemented.");
  }
  enableGroup(id: number, payload: Group) {
    throw new Error("Method not implemented.");
  }
  updateGroup(id: number, payload: Group) {
    throw new Error("Method not implemented.");
  }
  assignToGroups(groupId: number, payload: number[]) {
    throw new Error("Method not implemented.");
  }
  getGroupsByUserId(userId: number) {
    throw new Error("Method not implemented.");
  }

  getPermissionsByGroupId(userId: number) {
    throw new Error("Method not implemented.");
  }
  updateGroupPermissions(groupId: number, payload: number[]) {
    throw new Error("Method not implemented.");
  }
  getGroupMembers(groupId: number): Observable<User[]> {
    throw new Error("Method not implemented.");
  }
  addGroupMembers(groupId: number, payload: number[]) {
    throw new Error("Method not implemented.");
  }
  removeGroupMembers(groupId: number, payload: number[]) {
    throw new Error("Method not implemented.");
  }
}