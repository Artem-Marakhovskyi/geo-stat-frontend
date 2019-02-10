import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { LoggerService } from './logger.service';
import { Router } from '@angular/router';
import { UrlContaner } from '../url.contaner';
import { User } from 'src/app/models/user';
import { Response } from 'src/app/models/response';
import { UserAuth } from 'src/app/models/userAuth';
import { AletrtifyService } from './aletrtify.service';
import { catchError} from 'rxjs/operators';

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
          console.log(data);
          this.setToken(data.token);
          localStorage.setItem('email', user.email);
        },
        error => {
          this.alertifyService.error(error.error.Message);
        });
  }

  public setToken(token: string) {
    localStorage.setItem('geostat-token', token);
    this.router.navigate(['/']);
  }

  public logOff() {
    localStorage.removeItem('geostat-token');
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }

  public signUp(user: User) {
    this.http.post(UrlContaner.registerURL, user)
      .subscribe((data: Response) => {
        this.setToken(data.token);
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
