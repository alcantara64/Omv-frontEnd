import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { AuthService } from './core/services/business/auth.service';
import { StartupComponent } from './startup/startup.component';
import {PdfViewerComponent} from './shared/pdf-viewer/pdf-viewer.component';
import {MediaViewerComponent} from './shared/media-viewer/media-viewer.component';
import { UnAuthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthorizationCheckComponent } from './authorization-check/authorization-check.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'startup',
    component: StartupComponent
  },
  {
    path: 'unauthorize',
    component: UnAuthorizedComponent
  },
  {
    path: 'authorize-check',
    component: AuthorizationCheckComponent
  },
  {
    path: 'implicit/callback',
    component: AuthCallbackComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'pdf-viewer',
    data: {service: '', document: ''},
    component: PdfViewerComponent
  },
  {
    path: 'media-viewer/:id',
    component: MediaViewerComponent
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: false })
  ],
  exports: [ RouterModule ],
  providers: [AuthGuardService, AuthService]
})
export class AppRoutingModule {}
