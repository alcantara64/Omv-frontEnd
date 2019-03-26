import { User } from './../../../models/user';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AdminPermissionsDataService } from './admin-permissions.data.service';
import { Permission } from 'src/app/core/enum/permission';
import { Group_permissionDTO } from "src/app/core/dtos/permission.dto";
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export  class AdminPermissionsWebService implements AdminPermissionsDataService  {
        
    httpOptions = {
        headers: new HttpHeaders({
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "-1"
        })
      };

    constructor(private httpClient: HttpClient) {}

    getPermissions(): Observable<Group_permissionDTO[]> {
            var requestUri = environment.api.baseUrl + `/v1/permissions`;
            console.log("permission item endpoint", requestUri);
        
            return this.httpClient.get<Group_permissionDTO[]>(requestUri, this.httpOptions)
                  .pipe(
                    map(response => response),
                    catchError(e => {
                      console.log("error trying to retrieve permission ", e);
                      return of(null);
                    })
                  ); }
}