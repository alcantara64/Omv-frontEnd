import { AdminUsersComponent } from './admin-users-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { reducer } from './state/admin-users.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './state/admin-users.effects';

const userRoutes: Routes = [
  { path: 'users', component: AdminUsersComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(userRoutes),
    StoreModule.forFeature('users', reducer),
    EffectsModule.forFeature([UsersEffects])
  ],
  declarations: [
    AdminUsersComponent
  ]
})
export class AdminUserModule { }
