import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { AgmCoreModule } from '@agm/core';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { GroupUsersComponent } from './group-users/group-users.component';
import { MapComponent } from './map/map.component';
import { GroupMapComponent } from './group-map/group-map.component';
import { UserMapComponent } from './user-map/user-map.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from 'src/common/auth.interceptor';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AletrtifyService } from 'src/common/services/aletrtify.service';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    GroupUsersComponent,
    MapComponent,
    GroupMapComponent,
    UserMapComponent,
    HomeComponent
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
  providers: [
    AuthGuard,
    AletrtifyService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
