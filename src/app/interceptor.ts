import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './service/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = localStorage.getItem('jwt');
    console.log(jwt);
    console.log(this.storageService.getUser().id);
    const jwtSpring = this.storageService.getUser().accessToken;
    console.log(jwtSpring);
    if (jwtSpring) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtSpring}`
        }
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];