import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/common/services/logger.service';
import { HttpService } from 'src/common/services/http.service';
import { User } from '../models/user';
import { AccountService } from 'src/common/services/account.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
  providers: [LoggerService, HttpService]
})
export class RegistrationFormComponent implements OnInit {
  private passwordError;
  private user: User = new User();

  constructor(
    private loggerService: LoggerService,
    private httpService: HttpService,
    private accountService: AccountService,
    private router: Router) { }

  public submit(user: User) {
    if (user.password === user.repeatPassword) {
      this.accountService.signUp(user);
    } else {
      this.user.password = '';
      this.user.repeatPassword = '';
      alert('Passwords are not equal!');
    }
  }

  ngOnInit() { 
    if (this.accountService.isAuthorized()) {
      this.router.navigate(['/']);
    }
  }

}
