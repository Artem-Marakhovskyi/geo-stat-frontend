import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { LoggerService } from './logger.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpService,
    private logger: LoggerService,
    private router: Router) { }

  public logIn() {
    if (!this.isAuthorized()) {
      localStorage.setItem('geostat-token', 'test-token');
      this.router.navigate(['/']);
    }
  }

  public logOff() {
    if (this.isAuthorized()) {
      localStorage.removeItem('geostat-token');
      this.router.navigate(['/login']);
    }
  }

  public signUp() { }

  public isAuthorized() {
    return localStorage.getItem('geostat-token') === null ? false : true;
  }

}
