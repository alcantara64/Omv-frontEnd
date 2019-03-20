import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpModule } from '@angular/http';
import { AuthService } from './core/services/data/appsettings/auth.service';
import { SettingsService } from './core/services/data/appsettings/appsettings.service';
import { HttpClientModule } from '@angular/common/http';
import { AppHeaderComponent } from './shared/app-header/app-header.component';
import { environment } from 'src/environments/environment';

/* NgRx Modules */
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AdminModule } from './admin/admin.module';
import { AdminGroupEditComponent } from './admin/admin-group-edit/admin-group-edit.component';
import { AdminUsersService } from './core/services/business/admin-users/admin-users.service';
import {PageNotFoundComponent} from "./shared/page-not-found/page-not-found.component";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AppHeaderComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,    
    AdminModule,

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
    AdminUsersService
   ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
