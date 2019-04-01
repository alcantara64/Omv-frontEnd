import { LeftNavComponent } from './shared/leftnav/leftnav.component';
import { AppState } from './state/app.state';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpModule } from '@angular/http';
import { SettingsService } from './core/services/data/appsettings/appsettings.service';
import { HttpClientModule } from '@angular/common/http';
import { AppHeaderComponent } from './shared/app-header/app-header.component';
import { AdminModule } from './admin/admin.module';
import { AdminUsersService } from './core/services/business/admin-users/admin-users.service';

/* NgXS Modules */
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { SharedModule } from './shared/shared.module';
import {TreeViewModule} from "@syncfusion/ej2-angular-navigations";
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { StartupComponent } from './startup/startup.component';
import { CheckBoxModule, CheckBoxAllModule } from '@syncfusion/ej2-angular-buttons';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AppHeaderComponent,
    LeftNavComponent,
    AuthCallbackComponent,
    StartupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,   
    SharedModule, 
    AdminModule,
    TreeViewModule,
    CheckBoxAllModule,
    ToastModule,
    NgxsModule.forRoot([
      AppState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [
    SettingsService,
    AdminUsersService
   ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA]
})
export class AppModule { }
