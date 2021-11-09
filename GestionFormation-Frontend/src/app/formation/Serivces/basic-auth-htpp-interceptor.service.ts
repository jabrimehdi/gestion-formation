import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {

  constructor(private cookieService: CookieService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler){
    if (this.cookieService.get('token')) {
      req = req.clone({
        setHeaders: {
          Authorization: this.cookieService.get('token')
        }
      })
    }

    return next.handle(req);

  }
}
