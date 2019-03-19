import { ListComponent } from './../shared/list/list.component';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './admin-users/admin-users-list.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AdminRoutingModule } from './admin.routing.module';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { environment } from 'src/environments/environment';
import { UsersDataService } from '../core/services/data/users/users.data.service';
import { UsersMockDataService } from '../core/services/data/users/users.mock.data.service';
import { UsersWebDataService } from '../core/services/data/users/users.web.data.service';
import { TabAllModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonAllModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { reducer } from './admin-users/state/admin-users.reducer';
import { UsersEffects } from './admin-users/state/admin-users.effects';
import { BaseComponent } from '../shared/base/base.component';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
    TabAllModule,
    ButtonAllModule,
    CheckBoxModule,
    GridAllModule,
    DropDownButtonModule,
    SliderModule,
    StoreModule.forFeature('admin.users', reducer),
    EffectsModule.forFeature([UsersEffects])
  ],
  declarations: [
    AdminComponent,
    AdminUsersComponent,
    AdminSidebarComponent,
    AdminDashboardComponent,
    ListComponent,
    BaseComponent 
  ],
  providers: [
    { provide: UsersDataService, useClass: environment.useMocks ? UsersMockDataService : UsersWebDataService },
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdminModule { }
