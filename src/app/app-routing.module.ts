import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { GroupUsersComponent } from './group-users/group-users.component';
import { UserMapComponent } from './user-map/user-map.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { LoggedGuard } from 'src/common/guards/logged.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegistrationFormComponent,
    canActivate: [LoggedGuard]
  },
  {
    path: 'login',
    component: LoginFormComponent,
    canActivate: [LoggedGuard]
  },
  {
    path: 'groupsUsers',
    component: GroupUsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'userMap',
    component: UserMapComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
