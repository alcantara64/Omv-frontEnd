import { User } from './../../../models/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminPermissionsDataService } from './admin-permissions.data.service';
import { Permission } from 'src/app/core/enum/permission';

@Injectable({
    providedIn: 'root'
})
export  class AdminPermissionsWebService implements AdminPermissionsDataService  {
    getPermissionsByGroupId(groupId: number):Observable<Permission[]> {
        throw new Error("Method not implemented.");
    }
    getPermissions(): Observable<Permission[]> {
        throw new Error("Method not implemented.");
    }
}