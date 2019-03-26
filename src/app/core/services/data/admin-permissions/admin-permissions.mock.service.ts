import { User } from './../../../models/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminPermissionsDataService } from './admin-permissions.data.service';
import { Permission } from 'src/app/core/enum/permission';
import { HttpClient } from '@angular/common/http';
import { Group_permissionDTO } from 'src/app/core/dtos/permission.dto';

@Injectable({
    providedIn: 'root'
})
export  class AdminPermissionsMockService implements AdminPermissionsDataService {

    mockUrl = `./assets/mock/permissions.json`;
    constructor(private httpClient: HttpClient) {}

    getPermissions(): Observable<Group_permissionDTO[]> {
        return this.httpClient.get<Group_permissionDTO[]>(this.mockUrl);
      }
    
}