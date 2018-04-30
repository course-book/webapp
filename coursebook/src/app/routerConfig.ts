import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginPanelComponent } from './component/login-panel/login-panel.component';
import { HomeComponent } from './component/home/home.component';
import { CreateCourseComponent } from './component/create-course/create-course.component';
import { CreateWishComponent } from './component/create-wish/create-wish.component';

export const appRoutes: Routes = [
  {	path: '',
  	component: LoginPanelComponent
  },
  { path: 'home',
  	component: HomeComponent
  },
  { path: 'login', 
    component: LoginComponent 
  },
  { path: 'register', 
    component: RegisterComponent 
  },
  { path: 'create-course',
    component: CreateCourseComponent
  },
  { path: 'create-wish',
    component: CreateWishComponent
  }
];