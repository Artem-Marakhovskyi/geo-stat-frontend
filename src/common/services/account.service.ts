import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { LoggerService } from './logger.service';
import { Router } from '@angular/router';
import { UrlContaner } from '../url.contaner';
import { User } from 'src/app/models/user';
import { Response } from 'src/app/models/response';
import { UserAuth } from 'src/app/models/userAuth';
import { AletrtifyService } from './aletrtify.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpService,
    private logger: LoggerService,
    private alertifyService: AletrtifyService,
    private router: Router) { }

  public logIn(user: UserAuth) {
    this.http.post(UrlContaner.authURL, user)
      .subscribe(
        (data: Response) => {
          this.setAuthData(data);
        },
        error => {
          this.alertifyService.error(error.error.Message);
        });
  }

  public getUserEmail() {
    return localStorage.getItem('user-email');
  }

  public getUserId() {
    return localStorage.getItem('user-id');
  }

  public setAuthData(data: Response) {
    localStorage.setItem('geostat-token', data.Token);
    localStorage.setItem('user-email', data.UserEmail);
    localStorage.setItem('user-id', data.UserId);
    this.router.navigate(['/']);
  }

  public removeAuthData() {
    localStorage.removeItem('geostat-token');
    localStorage.removeItem('user-email');
    localStorage.removeItem('user-id');
    this.router.navigate(['/']);
  }

  public logOff() {
    this.removeAuthData();
    this.router.navigate(['/login']);
  }

  public signUp(user: User) {
    this.http.post(UrlContaner.registerURL, user)
      .subscribe((data: Response) => {
        this.setAuthData(data);
      },
      error => {
        this.alertifyService.error(error.error.Message);
      });
  }

  public isAuthorized() {
    return !!localStorage.getItem('geostat-token');
  }

  public redirectToLogin() {
    this.router.navigate(['/login']);
  }

}
