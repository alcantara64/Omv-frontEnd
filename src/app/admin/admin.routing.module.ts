import { AdminGroupMediaAccessComponent } from './admin-group-edit/admin-group-media-access/admin-group-media-access.component';
import { AdminGroupPermissionsComponent } from './admin-group-edit/admin-group-permissions/admin-group-permissions.component';
import { AdminGroupMembersComponent } from './admin-group-edit/admin-group-members/admin-group-members.component';
import { AdminGroupsTabsComponent } from './admin-groups-list/admin-groups-tabs/admin-groups-tabs.component';
import { AdminUsersTabsComponent } from './admin-users-list/admin-users-tabs/admin-users-tabs.component';
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
    component: AdminUsersTabsComponent,
    children: [
      { path: '', redirectTo: 'active', pathMatch: 'full' },
      { path: ':type', component: AdminUsersListComponent }
    ]
  },
  {
    path: 'admin/users/:id/edit',
    component: AdminUserEditComponent,
  },
  {
    path: 'admin/groups',
    component: AdminGroupsTabsComponent,
    children: [
      { path: '', redirectTo: 'active', pathMatch: 'full' },
      { path: ':type', component: AdminGroupsListComponent }
    ]
  },
  {
    path: 'admin/groups/:id/edit',
    component: AdminGroupEditComponent
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
