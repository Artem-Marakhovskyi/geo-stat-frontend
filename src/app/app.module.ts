import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { AgmCoreModule } from '@agm/core';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupUsersComponent } from './group-users/group-users.component';
import { MapComponent } from './map/map.component';
import { GroupMapComponent } from './group-map/group-map.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    GroupsComponent,
    GroupUsersComponent,
    MapComponent,
    GroupMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    LoggerModule.forRoot({ serverLoggingUrl: '/api/logs', level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAWXGhYlOQdFls1kiP9AXm7ELPek32KR6o'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
