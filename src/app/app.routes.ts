import { Routes } from '@angular/router';
import { HerosectionComponent } from './components/herosection/herosection.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', component: HerosectionComponent },
  { path: 'login', component: LoginComponent },
];

export class AppRoutingModule {}
