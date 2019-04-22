import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, from, observable } from 'rxjs';
import { tap, mergeMap } from 'rxjs/operators';
import { OktaAuthService } from '@okta/okta-angular';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private injector: Injector, private oktaAuth: OktaAuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return from(this.processInterceptor(req, next))

  }

  private async processInterceptor(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    const token = await this.oktaAuth.getAccessToken();
    console.log ('processinterceptor', token);
    let changedRequest = req.clone({
      headers: req.headers.set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    });

    return next.handle(changedRequest).toPromise();
  }
}
