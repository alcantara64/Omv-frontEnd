
import { ListComponent } from './../shared/list/list.component';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './admin-users/admin-users-list.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AdminRoutingModule } from './admin.routing.module';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { environment } from 'src/environments/environment';
import { TabAllModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonAllModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { reducer } from './admin-users/state/admin-users.reducer';
import { AdminUsersEffects } from './admin-users/state/admin-users.effects';
import { BaseComponent } from '../shared/base/base.component';
import {AppHeaderComponent} from "../shared/app-header/app-header.component";
import {AdminGroupsComponent} from "./admin-groups/admin-groups.component";
import { AdminUsersMockDataService } from '../core/services/data/admin-users/admin-users.mock.data.service';
import { AdminUsersWebDataService } from '../core/services/data/admin-users/admin-users.web.data.service';
import {AdminUsersDataService} from "../core/services/data/admin-users/admin-users.data.service";

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
    EffectsModule.forFeature([AdminUsersEffects])
  ],
  declarations: [
    AdminComponent,
    AdminUsersComponent,
    AdminSidebarComponent,
    AdminDashboardComponent,
    ListComponent,
    BaseComponent,
    AdminGroupsComponent
  ],
  providers: [
    { provide: AdminUsersDataService, useClass: environment.useMocks ? AdminUsersMockDataService : AdminUsersWebDataService },
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdminModule { }
