import { LeftNavComponent } from './shared/leftnav/leftnav.component';
import { AppState } from './state/app.state';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpModule } from '@angular/http';
import { SettingsService } from './core/services/data/appsettings/appsettings.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminModule } from './admin/admin.module';
import { AdminUsersService } from './core/services/business/admin-users/admin-users.service';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { SharedModule } from './shared/shared.module';
import {TreeViewModule} from "@syncfusion/ej2-angular-navigations";
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { StartupComponent } from './startup/startup.component';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { MediaModule } from './media/media.module';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { HttpInterceptorService } from './core/services/httpinterceptor.service';
import {DatePickerModule} from "@syncfusion/ej2-angular-calendars";
import { MetadataService } from './shared/dynamic-components/metadata.service';
import { MetadataDataService } from './core/services/data/metadata/metadata.data.service';
import { MetadataMockDataService } from './core/services/data/metadata/metadata.mock.service';
import { MetadataWebDataService } from './core/services/data/metadata/metadata.web.data.service';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AuthCallbackComponent,
    StartupComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    AdminModule,
    MediaModule,
    SharedModule, 
    TreeViewModule,
    CheckBoxModule,
    ToastModule,
    ListViewModule,
    GridAllModule,
    DatePickerModule,
    NgxsModule.forRoot([
      AppState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: MetadataDataService, useClass: environment.useMocks ? MetadataMockDataService : MetadataWebDataService },
    SettingsService,
    AdminUsersService,
    MetadataService
   ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA]
})
export class AppModule { }
