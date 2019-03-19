import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { Routes, RouterModule } from "@angular/router";
import { AdminUsersComponent } from './admin-users/admin-users-list.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminGroupEditComponent } from './admin-group-edit/admin-group-edit.component';

const adminRoutes: Routes = [
  { 
    path: 'admin',
    component: AdminComponent,
    children: [
      { 
        path: 'dashboard',
        component: AdminDashboardComponent
      },
      { 
        path: 'users',
        component: AdminUsersComponent
      }       
    ]
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