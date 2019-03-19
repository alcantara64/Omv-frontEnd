import { AdminComponent } from './admin/admin.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminGroupEditComponent } from './admin/admin-group-edit/admin-group-edit.component';

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  },
  { 
    path: 'admin/groups/id/edit',
    component: AdminGroupEditComponent
  } 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
