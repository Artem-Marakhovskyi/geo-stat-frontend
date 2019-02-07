import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { GroupUsersComponent } from './group-users/group-users.component';
import { MapComponent } from './map/map.component';
import { GroupMapComponent } from './group-map/group-map.component';
import { UserMapComponent } from './user-map/user-map.component';
import { HomeComponent } from './home/home.component';

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
    component: RegistrationFormComponent
  },
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'groupsUsers',
    component: GroupUsersComponent
  },
  {
    path: 'userMap',
    component: UserMapComponent
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
