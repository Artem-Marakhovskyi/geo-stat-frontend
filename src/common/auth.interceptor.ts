import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (localStorage.getItem('geostat-token')) {
            const newRequest = req.clone({
                headers: req.headers.append('GEOSTAT_AUTH', localStorage.getItem('geostat-token'))
            });

            return next.handle(newRequest);

        }

        return next.handle(req);
    }
}