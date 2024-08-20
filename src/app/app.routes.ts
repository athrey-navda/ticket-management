import { Routes } from '@angular/router';
import { HerosectionComponent } from './components/herosection/herosection.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
  { path: '', component: HerosectionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

export class AppRoutingModule {}
