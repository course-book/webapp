import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routerConfig';
import { UserService } from './_services/user.service'

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginPanelComponent } from './component/login-panel/login-panel.component';
import { HomeComponent } from './component/home/home.component';
import { CreateCourseComponent } from './component/create-course/create-course.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LoginPanelComponent,
    HomeComponent,
    CreateCourseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
