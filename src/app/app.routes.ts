import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginCompononetComponent } from './login-compononet/login-compononet.component';

export const routes: Routes = [
  { path: '', component: LoginCompononetComponent },
  { path: 'home', component: HomeComponent },
];
