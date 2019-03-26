import { User } from '../../../models/entity/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permission } from 'src/app/core/enum/permission';
import { Group_permissionDTO } from 'src/app/core/dtos/permission.dto';

@Injectable({
    providedIn: 'root'
})
export abstract class AdminPermissionsDataService {

    abstract getPermissions(): Observable<Group_permissionDTO[]>;
}
