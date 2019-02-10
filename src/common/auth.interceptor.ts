import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const newRequest = req.clone({
            headers: req.headers.set('GeoStatAuthToken', localStorage.getItem('geostat-token'))
        });

        console.log(localStorage.getItem('geostat-token'));

        return next.handle(req);

    }
}