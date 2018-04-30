import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routerConfig';
import { UserService } from './_services/user.service'
import { CourseService } from './_services/course.service'

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginPanelComponent } from './component/login-panel/login-panel.component';
import { HomeComponent } from './component/home/home.component';
import { CreateCourseComponent } from './component/create-course/create-course.component';
import { CreateWishComponent } from './component/create-wish/create-wish.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LoginPanelComponent,
    HomeComponent,
    CreateCourseComponent,
    CreateWishComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UserService,
    CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
