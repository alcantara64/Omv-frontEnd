import { AdminGroupEditComponent } from './admin-group-edit/admin-group-edit.component';

import { ListComponent } from './../shared/list/list.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUsersListComponent } from './admin-users-list/admin-users-list.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin.routing.module';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { environment } from 'src/environments/environment';
import { TabAllModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonAllModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { SliderModule, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { BaseComponent } from '../shared/base/base.component';
import { AdminGroupsListComponent } from "./admin-groups-list/admin-groups-list.component";
import { AdminUsersMockDataService } from '../core/services/data/admin-users/admin-users.mock.data.service';
import { AdminUsersWebDataService } from '../core/services/data/admin-users/admin-users.web.data.service';
import { AdminUsersDataService } from "../core/services/data/admin-users/admin-users.data.service";
import { AdminUserState } from './admin-users-list/state/admin-users.state';

/* NgXS */
import { NgxsModule } from '@ngxs/store';
import { AdminUserEditComponent } from './admin-user-edit/admin-user-edit.component';

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
    TextBoxModule,
    NgxsModule.forFeature([
      AdminUserState
    ]),
  ],
  declarations: [
    AdminUsersListComponent,
    AdminUserEditComponent,
    AdminGroupsListComponent,    
    AdminGroupEditComponent,
    AdminSidebarComponent,
    AdminDashboardComponent,
    ListComponent,
    BaseComponent
  ],
  providers: [
    { provide: AdminUsersDataService, useClass: environment.useMocks ? AdminUsersMockDataService : AdminUsersWebDataService },
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdminModule { }
