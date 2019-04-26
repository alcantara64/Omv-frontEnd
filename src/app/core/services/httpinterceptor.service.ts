import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, from, observable } from 'rxjs';
import { AuthService } from './business/auth.service';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return from(this.processInterceptor(req, next))

  }

  private async processInterceptor(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {


    const token = await this.auth.getAccessToken();
    console.log('HttpInterceptorService processInterceptor token: ', token);
    console.log('HttpInterceptorService processInterceptor localstorage: ', localStorage.getItem('okta-token-storage'));

    const exlude = 'blob.core.windows.net';

    let changedRequest: HttpRequest<any> = req;  

    if (token && (req.url.search(exlude) === -1)) {
      if (req.method === 'GET') { // for IE
        changedRequest = req.clone({
          headers: req.headers.set('Cache-Control', 'no-cache')
            .set('Pragma', 'no-cache')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
        });
      } else {
        changedRequest = req.clone({
          headers: req.headers.set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
        });
      }

     

    }

    

    return next.handle(changedRequest).toPromise();
  }
}
