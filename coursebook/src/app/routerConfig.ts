import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginPanelComponent } from './component/login-panel/login-panel.component';
import { HomeComponent } from './component/home/home.component';

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
  }
];