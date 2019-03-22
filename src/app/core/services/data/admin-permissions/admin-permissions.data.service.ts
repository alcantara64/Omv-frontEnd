import { UserItem } from './../../../models/user.item';
import { User } from './../../../models/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permission } from 'src/app/core/enum/permission';

@Injectable({
    providedIn: 'root'
})
export abstract class AdminPermissionsDataService {
    
    abstract getPermissions(): Observable<Permission[]>;
}