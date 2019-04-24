import { AppState } from './state/app.state';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, APP_INITIALIZER } from '@angular/core';

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
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { StartupComponent } from './startup/startup.component';
import { MediaModule } from './media/media.module';
import { BlobModule } from 'angular-azure-blob-service';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { HttpInterceptorService } from './core/services/httpinterceptor.service';
import { AppStartupService } from './core/services/appstartup.service';
import { environment } from 'src/environments/environment';
import { UsersDataService } from './core/services/data/users/users.data.service';
import { UsersMockDataService } from './core/services/data/users/users.mock.data.service';
import { UsersWebDataService } from './core/services/data/users/users.web.data.service';
import { UnAuthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthorizationCheckComponent } from './authorization-check/authorization-check.component';

const appUrl = `${window.location.protocol}//${window.location.host.toLowerCase()}`;

const config = {
  issuer: 'https://{Provide Okta Issuer Url}',
  redirectUri: `${appUrl}/implicit/callback`,
  clientId: '{Provide Okta App Client Id}'
}

// okta client configuration setting duing application bootstrap
const runAppInitializer = (appStart: AppStartupService) => {
  return () => {
    console.log('runAppInitializer');
    var oktaConfig =  appStart.load();
    config.issuer = oktaConfig.issuer;
    config.clientId = oktaConfig.clientId;
    return oktaConfig;
  };
};

@NgModule({
  declarations: [
    AppComponent,
    AuthCallbackComponent,
    DashboardComponent,
    StartupComponent,
    UnAuthorizedComponent,
    AuthorizationCheckComponent
  ],
  imports: [    
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AdminModule,
    MediaModule,
    SharedModule,
    ToastModule,
      
    BlobModule.forRoot(),
    NgxsModule.forRoot([ AppState ],  { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: UsersDataService, useClass: environment.useMocks ? UsersMockDataService : UsersWebDataService },
    SettingsService,
    AdminUsersService
   ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA]
})
export class AppModule { }
