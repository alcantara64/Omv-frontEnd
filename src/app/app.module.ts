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
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { StartupComponent } from './startup/startup.component';
import { MediaModule } from './media/media.module';
import { BlobModule } from 'angular-azure-blob-service';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { FiltersComponent } from './filters/filters.component';
import {
  OKTA_CONFIG,
  OktaAuthGuard,
  OktaAuthModule,
  OktaCallbackComponent,
} from '@okta/okta-angular';
import { HttpInterceptorService } from './core/services/httpinterceptor.service';

const config = {
  issuer: 'https://dev-104918.okta.com/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '0oahryql8HD45nO6v356'
}

@NgModule({
  declarations: [
    AppComponent,
    AuthCallbackComponent,
    DashboardComponent,
    StartupComponent
  ],
  imports: [    
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    OktaAuthModule.initAuth(config),
    
    AdminModule,
    MediaModule,
    SharedModule,
    ToastModule,

    BlobModule.forRoot(),
    NgxsModule.forRoot([ AppState ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    SettingsService,
    AdminUsersService
   ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA]
})
export class AppModule { }
