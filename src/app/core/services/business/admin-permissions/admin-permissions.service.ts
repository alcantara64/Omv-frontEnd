import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permission } from 'src/app/core/enum/permission';
import { AdminPermissionsDataService } from '../../data/admin-permissions/admin-permissions.data.service';


@Injectable({
  providedIn: 'root'
})
export class AdminPermissionsService {

  constructor(private AdminPermissionsDataService: AdminPermissionsDataService) { }

  // getPermissions(): Observable<Group_permissionDTO[]> {
  //   return this.AdminPermissionsDataService.getPermissions();
  // }
}
