import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpModule } from '@angular/http';
import { AuthService } from './core/services/auth.service';
import { SettingsService } from './core/services/appsettings.service';
import { HttpClientModule } from '@angular/common/http';
import { AppHeaderComponent } from './shared/app-header/app-header.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users-list.component';
import { UsersDataService } from './core/services/data/users.data.service';
import { environment } from 'src/environments/environment';
import { UsersMockDataService } from './core/services/data/users.mock.data.service';
import { UsersWebDataService } from './core/services/data/users.web.data.service';
import { UsersService } from './core/services/business/users.service';
import { AdminComponent } from './admin/admin.component';
import { TabAllModule } from '@syncfusion/ej2-angular-navigations';
import { CheckBoxModule, ButtonAllModule } from '@syncfusion/ej2-angular-buttons';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { SliderModule } from '@syncfusion/ej2-angular-inputs';

/* NgRx Modules */
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AppHeaderComponent,
    AdminDashboardComponent,
    AdminSidebarComponent,
    AdminUsersComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,    
    TabAllModule,
    ButtonAllModule,
    CheckBoxModule,
    GridAllModule,
    DropDownButtonModule,
    SliderModule,

    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'OMV App Devtools',
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [
    AuthService,
    SettingsService,
    UsersService,

    { provide: UsersDataService, useClass: environment.useMocks ? UsersMockDataService : UsersWebDataService },
   ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
