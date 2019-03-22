import { AdminUserEditComponent } from './admin-user-edit/admin-user-edit.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { Routes, RouterModule } from "@angular/router";
import { AdminUsersListComponent } from './admin-users-list/admin-users-list.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminGroupsListComponent } from './admin-groups-list/admin-groups-list.component';
import {AdminGroupEditComponent} from "./admin-group-edit/admin-group-edit.component";

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminDashboardComponent,
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
  },
  {
    path: 'admin/users',
    component: AdminUsersListComponent,
  },
  {
    path: 'admin/users/:id',
    component: AdminUserEditComponent,
  },
  {
    path: 'admin/groups',
    component: AdminGroupsListComponent,
  },
  {
    path: 'admin/groups/edit/:groupID',
    component: AdminGroupEditComponent,
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
