import { AdminMediaUploadsListComponent } from './admin-media-uploads-list/admin-media-uploads-list.component';
import { AdminMediaUploadsTabsComponent } from './admin-media-uploads-list/admin-media-uploads-tabs/admin-media-uploads-tabs.component';
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
import { AdminGroupEditGuard } from './admin-group-edit/admin-group-edit.guard';
import { AdminUserEditGuard } from './admin-user-edit/admin-user-edit.guard';
import { AuthGuardService } from '../core/guards/auth-guard.service';
import {AdminMediaNewUploadsComponent} from "./admin-media-uploads-list/admin-media-new-uploads/admin-media-new-uploads.component";
import {AdminMediaUploadsHistoryComponent} from "./admin-media-uploads-list/admin-media-uploads-history/admin-media-uploads-history.component";
import {AdminMetadataListComponent} from "./admin-metadata-list/admin-metadata-list.component";

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path: 'admin/media/uploads',
    component: AdminMediaUploadsListComponent,
    children: [
      { path: '', redirectTo: 'new', pathMatch: 'full' },
      { path: 'new', component: AdminMediaNewUploadsComponent },
      { path: 'history', component: AdminMediaUploadsHistoryComponent }
    ]
  },
  {
    path: 'admin/users',
    component: AdminUsersTabsComponent,
    children: [
      { path: '', redirectTo: 'active', pathMatch: 'full' },
      { path: ':type', component: AdminUsersListComponent }
    ],
    // canActivate: [AuthGuardService]
  },
  {
    path: 'admin/users/:id/edit',
    canDeactivate: [AdminUserEditGuard],
    component: AdminUserEditComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/groups',
    component: AdminGroupsTabsComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'active', pathMatch: 'full' },
      { path: ':type', component: AdminGroupsListComponent }
    ]
  },
  {
    path: 'admin/groups/:id/edit',
    canDeactivate: [AdminGroupEditGuard],
    component: AdminGroupEditComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/media/metadata',
    component: AdminMetadataListComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: '', component: AdminMetadataListComponent }
    ]
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
