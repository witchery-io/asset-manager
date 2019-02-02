import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '@app/core/services';


@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const api = this.injector.get<ApiService>(ApiService);
    const authHeader = api.getAuthorizationHeader();

    if (!authHeader) {
      return next.handle(req);
    }

    // Clone the request to add the new headers.
    const extendedReq = req.clone({
      headers: req.headers.set('Authorization', authHeader),
    });

    // Pass on the cloned request instead of the original request.
    return next.handle(extendedReq);
  }
}
