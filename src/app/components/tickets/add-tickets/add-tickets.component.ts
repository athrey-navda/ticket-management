import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { TicketService } from '../../../services/tickets.service';

@Component({
  selector: 'app-add-tickets',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-tickets.component.html',
  styleUrl: './add-tickets.component.css',
})
export class AddTicketsComponent {
  title: string = '';
  description: string = '';
  error: string = '';
  constructor(
    private ticketService: TicketService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  onSubmit() {
    this.ticketService.createTicket(this.title, this.description).subscribe({
      next: (response) => {
        console.log('Added ticket successful:', response);

        this.router.navigate(['/tickets']);
      },
      error: (error) => {
        console.error('Add ticket failed failed:', error);
        this.error = error.error.data.message || 'An error occurred';
      },
    });
  }
}
