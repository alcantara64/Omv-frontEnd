import { AdminGroupState } from './state/admin-groups/admin-groups.state';
import { AdminGroupEditComponent } from './admin-group-edit/admin-group-edit.component';

import { ListComponent } from './../shared/list/list.component';
import { EditComponent } from '../shared/edit/edit.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUsersListComponent } from './admin-users-list/admin-users-list.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin.routing.module';
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
import { AdminUserState } from './state/admin-users/admin-users.state';

/* NgXS */
import { NgxsModule } from '@ngxs/store';

import { AdminUserEditComponent } from './admin-user-edit/admin-user-edit.component';
import { AdminGroupsDataService } from '../core/services/data/admin-groups/admin-groups.data.service';
import { AdminGroupsMockDataService } from '../core/services/data/admin-groups/admin-groups.mock.data.service';
import { AdminGroupsWebDataService } from '../core/services/data/admin-groups/admin.groups.web.data.service';
import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ModalComponent } from '../shared/modal/modal.component';
import { AdminUsersTabsComponent } from './admin-users-list/admin-users-tabs/admin-users-tabs.component';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { TabsComponent } from '../shared/tabs/tabs.component';
import { AdminGroupsTabsComponent } from './admin-groups-list/admin-groups-tabs/admin-groups-tabs.component';
import { AdminPermissionsDataService } from '../core/services/data/admin-permissions/admin-permissions.data.service';
import { AdminPermissionsMockService } from '../core/services/data/admin-permissions/admin-permissions.mock.service';
import { AdminPermissionsWebService } from '../core/services/data/admin-permissions/admin-permissions.web.data.service';
import { AdminUserGroupsComponent } from './admin-user-edit/admin-user-groups/admin-user-groups.component';
import { AdminGroupPermissionsComponent } from './admin-group-edit/admin-group-permissions/admin-group-permissions.component';
import { AdminGroupMembersComponent } from './admin-group-edit/admin-group-members/admin-group-members.component';
import { AdminGroupMediaAccessComponent } from './admin-group-edit/admin-group-media-access/admin-group-media-access.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminMediaAccessDataService } from '../core/services/data/admin-media-access/admin-media-access.data.service';
import { AdminMediaAccessMockDataService } from '../core/services/data/admin-media-access/admin-media-access.mock.service';
import { AdminMediaAccessWebDataService } from '../core/services/data/admin-media-access/admin-media-access.web.service';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { AdminPermissionState } from './state/admin-permissions/admin-permissions.state';
import { ToastModule, ToastAllModule } from '@syncfusion/ej2-angular-notifications';

@NgModule({
  imports: [
    SharedModule,
    DialogModule,
    AdminRoutingModule,
    TabAllModule,
    ButtonAllModule,
    CheckBoxModule,
    DropDownButtonModule,
    SliderModule,
    TextBoxModule,
    DropDownListAllModule,   
    MultiSelectAllModule,
    ReactiveFormsModule,
    TreeViewModule,
    ToastAllModule,
    NgxsModule.forFeature([
      AdminUserState,
      AdminGroupState,
      AdminPermissionState
    ])
    
  ],
  declarations: [
    AdminUsersListComponent,
    AdminUserEditComponent,
    AdminUsersTabsComponent,
    AdminGroupsListComponent,
    AdminGroupEditComponent,
    AdminGroupsTabsComponent,
    AdminDashboardComponent,
    AdminGroupsTabsComponent,
    AdminUserGroupsComponent,
    AdminGroupPermissionsComponent,
    AdminGroupMembersComponent,
    AdminGroupMediaAccessComponent
  ],
  providers: [
    { provide: AdminUsersDataService, useClass: environment.useMocks ? AdminUsersMockDataService : AdminUsersWebDataService },
    { provide: AdminGroupsDataService, useClass: environment.useMocks ? AdminGroupsMockDataService : AdminGroupsWebDataService },
    { provide: AdminPermissionsDataService, useClass: environment.useMocks ? AdminPermissionsMockService : AdminPermissionsWebService },
    { provide: AdminMediaAccessDataService, useClass: environment.useMocks ? AdminMediaAccessMockDataService : AdminMediaAccessWebDataService },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AdminModule { } 
