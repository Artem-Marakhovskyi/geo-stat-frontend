import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalDataService } from './services/local-data.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private localDataService: LocalDataService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.localDataService.getToken();

        if (token) {
            const newRequest = req.clone({
                headers: req.headers.append('GEOSTAT_AUTH', token)
            });

            return next.handle(newRequest);

        }

        return next.handle(req);
    }
}
