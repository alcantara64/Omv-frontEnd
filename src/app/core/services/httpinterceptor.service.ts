import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './business/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private injector: Injector) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService);
    const changedReq = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
            .set('Authorization', `${localStorage.getItem('token_type')} ${localStorage.getItem('access_token')}`)
    });
    let ok: string;
    return next.handle(changedReq)
        .pipe(
        tap(
            // Succeeds when there is a response; ignore other events
            event => ok = event instanceof HttpResponse ? 'succeeded' : '',
            // Operation failed; error is an HttpErrorResponse
            error => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401 || error.status === 403) {
                        localStorage.clear();
                        sessionStorage.clear();
                        authService.startAuthentication();
                        this.router.navigate(['/startup']);
                    }
                }
            }
        ),
    );
  }
}
