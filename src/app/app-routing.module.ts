import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LocationsComponent } from './locations/locations.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupUsersComponent } from './group-users/group-users.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'register', component: RegistrationFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'groupsUsers', component: GroupUsersComponent },
  { path: 'map', component: MapComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
