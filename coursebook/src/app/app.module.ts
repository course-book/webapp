import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routerConfig';
import { UserService } from './_services/user.service'
import { CourseService } from './_services/course.service'
import { WishService } from './_services/wish.service'
import { StatService } from './_services/stat.service'
import { LocalStorageModule } from '@ngx-pwa/local-storage';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginPanelComponent } from './component/login-panel/login-panel.component';
import { HomeComponent } from './component/home/home.component';
import { CreateCourseComponent } from './component/create-course/create-course.component';
import { CreateWishComponent } from './component/create-wish/create-wish.component';
import { EditWishComponent } from './component/edit-wish/edit-wish.component';
import { EditCourseComponent } from './component/edit-course/edit-course.component';
import { CourseViewComponent } from './component/course-view/course-view.component';
import { StatComponent } from './component/stat/stat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LoginPanelComponent,
    HomeComponent,
    CreateCourseComponent,
    CreateWishComponent,
    EditWishComponent,
    EditCourseComponent,
    CourseViewComponent,
    StatComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    LocalStorageModule
  ],
  providers: [
    UserService,
    CourseService,
    WishService,
    StatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
