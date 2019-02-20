import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/common/services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private isLogged = false;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.isLogged = this.accountService.isAuthorized();
  }

}
