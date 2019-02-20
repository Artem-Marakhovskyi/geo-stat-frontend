import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { AletrtifyService } from '../services/aletrtify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private accountService: AccountService,
    private alertifyService: AletrtifyService,
    private router: Router) { }

  canActivate(): boolean {
    if (this.accountService.isAuthorized()) {
      return true;
    }

    this.alertifyService.error('You must be logged in!');
    this.router.navigate(['/login']);
    return false;
  }

}
