import { AdminGroupState } from './state/admin-groups/admin-groups.state';
import { AdminGroupEditComponent } from './admin-group-edit/admin-group-edit.component';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUsersListComponent } from './admin-users-list/admin-users-list.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin.routing.module';
import { environment } from 'src/environments/environment';
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
import { AdminUsersTabsComponent } from './admin-users-list/admin-users-tabs/admin-users-tabs.component';
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
import { AdminPermissionState } from './state/admin-permissions/admin-permissions.state';
import { AdminMediaUploadsListComponent } from './admin-media-uploads-list/admin-media-uploads-list.component';
import { AdminMediaUploadsTabsComponent } from './admin-media-uploads-list/admin-media-uploads-tabs/admin-media-uploads-tabs.component';
import { AdminMediaState } from './state/admin-media/admin-media.state';
import { AdminMediaDataService } from '../core/services/data/admin-media/admin-media.data.service';
import { AdminMediaWebDataService } from '../core/services/data/admin-media/admin-media.web.data.service';
import { AdminMediaMockDataService } from '../core/services/data/admin-media/admin-media.mock.data.service';
import { AdminMetadataListComponent } from './admin-metadata-list/admin-metadata-list.component';
import { AdminMetadataFieldsComponent } from './admin-metadata-fields/admin-metadata-fields.component';
// import { AdminMediaMockDataService } from '../core/services/data/admin-media/admin-media.mock.data.service';
import { DialogModule } from '@syncfusion/ej2-angular-popups/src/dialog/dialog.module';
import { TabModule } from '@syncfusion/ej2-angular-navigations/src/tab/tab.module';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons/src/button/button.module';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons/src/check-box/checkbox.module';
import { SliderModule } from '@syncfusion/ej2-angular-inputs/src/slider/slider.module';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs/src/textbox/textbox.module';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns/src/drop-down-list/dropdownlist.module';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns/src/multi-select/multiselect.module';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations/src/treeview/treeview.module';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';

@NgModule({
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
    AdminGroupMediaAccessComponent,
    AdminMediaUploadsListComponent,
    AdminMediaUploadsTabsComponent,
    AdminMetadataListComponent,
    AdminMetadataFieldsComponent
  ],
  imports: [
    SharedModule,
    DialogModule,
    AdminRoutingModule,
    TabModule,
    ButtonModule,
    CheckBoxModule,
    DropDownButtonModule,
    SliderModule,
    TextBoxModule,
    DropDownListModule,
    MultiSelectModule,
    ReactiveFormsModule,
    TreeViewModule,
    ToastModule,
    NgxsModule.forFeature([
      AdminUserState,
      AdminGroupState,
      AdminPermissionState,
      AdminMediaState
    ])
  ],
  providers: [
    { provide: AdminUsersDataService, useClass: environment.useMocks ? AdminUsersMockDataService : AdminUsersWebDataService },
    { provide: AdminGroupsDataService, useClass: environment.useMocks ? AdminGroupsMockDataService : AdminGroupsWebDataService },
    { provide: AdminPermissionsDataService, useClass: environment.useMocks ? AdminPermissionsMockService : AdminPermissionsWebService },
    { provide: AdminMediaAccessDataService, useClass: environment.useMocks ? AdminMediaAccessMockDataService : AdminMediaAccessWebDataService },
    { provide: AdminMediaDataService, useClass: environment.useMocks ?AdminMediaWebDataService  : AdminMediaMockDataService }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AdminModule { } 
