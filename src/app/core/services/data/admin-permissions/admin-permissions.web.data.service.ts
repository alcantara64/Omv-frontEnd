import { User } from '../../../models/entity/user';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AdminPermissionsDataService } from './admin-permissions.data.service';
import { Permission } from 'src/app/core/enum/permission';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export  class AdminPermissionsWebService implements AdminPermissionsDataService  {
    getPermissions(): Observable<Permission[]> {
        throw new Error("Method not implemented.");
    }
}
