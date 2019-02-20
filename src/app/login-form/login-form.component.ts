import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/common/services/logger.service';
import { HttpService } from 'src/common/services/http.service';
import { User } from '../models/user';
import { AccountService } from 'src/common/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [LoggerService, HttpService]
})
export class LoginFormComponent implements OnInit {
  private user: User = new User();

  constructor(
    private loggerService: LoggerService,
    private accountService: AccountService,
    private router: Router) { }

  public submit(user: User) {
    this.accountService.logIn(user);
  }

  ngOnInit() { }

}
