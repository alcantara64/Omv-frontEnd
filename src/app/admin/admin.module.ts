import { AdminGroupState } from './admin-groups-list/state/admin-groups.state';
import { AdminGroupEditComponent } from './admin-group-edit/admin-group-edit.component';

import { ListComponent } from './../shared/list/list.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUsersListComponent } from './admin-users-list/admin-users-list.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin.routing.module';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { environment } from 'src/environments/environment';
import { TabAllModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonAllModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { SliderModule, TextBoxModule } from '@syncfusion/ej2-angular-inputs';

import { AdminGroupsListComponent } from "./admin-groups-list/admin-groups-list.component";
import { AdminUsersMockDataService } from '../core/services/data/admin-users/admin-users.mock.data.service';
import { AdminUsersWebDataService } from '../core/services/data/admin-users/admin-users.web.data.service';
import { AdminUsersDataService } from "../core/services/data/admin-users/admin-users.data.service";
import { AdminUserState } from './admin-users-list/state/admin-users.state';

/* NgXS */
import { NgxsModule } from '@ngxs/store';

import { AdminUserEditComponent } from './admin-user-edit/admin-user-edit.component';
import { AdminGroupsDataService } from '../core/services/data/admin-groups/admin-groups.data.service';
import { AdminGroupsMockDataService } from '../core/services/data/admin-groups/admin-groups.mock.data.service';
import { AdminGroupsWebDataService } from '../core/services/data/admin-groups/admin.groups.mock.web.data.service';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ModalComponent } from '../shared/modal/modal.component';
import { AdminUsersTabsComponent } from './admin-users-list/admin-users-tabs/admin-users-tabs.component';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { TabsComponent } from '../shared/tabs/tabs.component';
import { AdminGroupsTabsComponent } from './admin-groups-list/admin-groups-tabs/admin-groups-tabs.component';
import { AdminPermissionsDataService } from '../core/services/data/admin-permissions/admin-permissions.data.service';
import { AdminPermissionsMockService } from '../core/services/data/admin-permissions/admin-permissions.mock.service';
import { AdminPermissionsWebService } from '../core/services/data/admin-permissions/admin-permissions.web.data.service';
import { AdminPermissionState } from './admin-permissions/state/admin-permissions.state';

@NgModule({
  imports: [
    SharedModule,
    DialogModule,
    AdminRoutingModule,
    TabAllModule,
    ButtonAllModule,
    CheckBoxModule,
    GridAllModule,
    DropDownButtonModule,
    SliderModule,
    TextBoxModule,
    DropDownListAllModule,
    NgxsModule.forFeature([
      AdminUserState,
      AdminGroupState,
      AdminPermissionState
    ]),
    ListViewModule
  ],
  declarations: [
    AdminUsersListComponent,
    AdminUserEditComponent,
    AdminUsersTabsComponent,
    AdminGroupsListComponent,
    AdminGroupEditComponent,
    AdminGroupsTabsComponent,
    AdminSidebarComponent,
    AdminDashboardComponent,
    ModalComponent,
    ListComponent,
    TabsComponent,
    AdminGroupsTabsComponent
  ],
  providers: [
    { provide: AdminUsersDataService, useClass: environment.useMocks ? AdminUsersMockDataService : AdminUsersWebDataService },
    { provide: AdminGroupsDataService, useClass: environment.useMocks ? AdminGroupsMockDataService : AdminGroupsWebDataService },
    { provide: AdminPermissionsDataService, useClass: environment.useMocks ? AdminPermissionsMockService : AdminPermissionsWebService },
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class AdminModule { }
