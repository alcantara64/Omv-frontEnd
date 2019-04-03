import { User } from '../../../models/entity/user';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AdminPermissionsDataService } from './admin-permissions.data.service';
import { Permission } from 'src/app/core/enum/permission';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Permission_GetAllOutputDTO } from 'src/app/core/dtos/output/permissions/Permission_GetAllOutputDTO';
import * as automapper from 'automapper-ts';

@Injectable({
    providedIn: 'root'
})
export class AdminPermissionsWebService implements AdminPermissionsDataService {

    constructor(private httpClient: HttpClient) {

    }


    getPermissions(): Observable<Permission[]> {
        var request = new Permission_GetAllOutputDTO();
        const requestUri = environment.api.baseUrl + `/v1/permissions`;

        return this.httpClient.get<Permission_GetAllOutputDTO[]>(requestUri).pipe(map(

            response => {
                
                automapper
                    .createMap(response, Permission)
                    .forMember('id', function (opts) { opts.mapFrom('permissionId'); })
                    .forMember('name', function (opts) { opts.mapFrom('permissionDescription'); })
                    .forMember('status', function (opts) { opts.mapFrom('status'); });

                const _response = automapper.map(response, Permission, response);
                return _response;

            })
        );
    }
    
}
