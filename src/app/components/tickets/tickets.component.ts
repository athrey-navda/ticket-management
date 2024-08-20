import { Component } from '@angular/core';
import { Ticket, TicketService } from '../../services/tickets.service';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
})
export class TicketComponent {
  tickets: Ticket[] = [];
  error: string = '';
  constructor(private ticketService: TicketService) {}

  onSubmit() {
    this.ticketService.getTickets().subscribe({
      next: (response) => {
        this.tickets = response;
        console.log('Get successful:', response);
      },
      error: (error) => {
        console.error('Get failed:', error);
        this.error = error.error.data.message || 'An error occurred';
      },
    });
  }
}
