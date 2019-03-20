import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { Routes, RouterModule } from "@angular/router";
import { AdminUsersComponent } from './admin-users/admin-users-list.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {AdminGroupsComponent} from "./admin-groups/admin-groups.component";

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'admin/:pageView',
    component: AdminComponent,
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
