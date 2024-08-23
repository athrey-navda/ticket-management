import { Routes } from '@angular/router';
import { HerosectionComponent } from './components/herosection/herosection.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TicketComponent } from './components/tickets/tickets.component';
import { SelectedTicketsComponent } from './components/tickets/selected-tickets/selected-tickets.component';
import { AddTicketsComponent } from './components/tickets/add-tickets/add-tickets.component';

export const routes: Routes = [
  { path: '', component: HerosectionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'tickets', component: TicketComponent },
  { path: 'selected-ticket/:id', component: SelectedTicketsComponent },
  { path: 'add-ticket', component: AddTicketsComponent },
];

export class AppRoutingModule {}
