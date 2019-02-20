import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { LoggerService } from './logger.service';
import { Router } from '@angular/router';
import { UrlContaner } from '../url.contaner';
import { User } from 'src/app/models/user';
import { Response } from 'src/app/models/response';
import { UserAuth } from 'src/app/models/userAuth';
import { AletrtifyService } from './aletrtify.service';
import { LocalDataService } from './local-data.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpService,
    private logger: LoggerService,
    private alertifyService: AletrtifyService,
    private localDataService: LocalDataService,
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
    return this.localDataService.getUserEmail();
  }

  public getUserId() {
    return this.localDataService.getUserId();
  }

  public setAuthData(data: Response) {
    this.localDataService.setToken( data.Token);
    this.localDataService.setUserEmail(data.UserEmail);
    this.localDataService.setUserId(data.UserId);
    this.router.navigate(['/']);
  }

  public removeAuthData() {
    this.localDataService.removeAllData();
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
    return !!this.localDataService.getToken();
  }

  public redirectToLogin() {
    this.router.navigate(['/login']);
  }

}
