import { Component } from '@angular/core';
import { Ticket, TicketService } from '../../services/tickets.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketComponent {
  tickets: Ticket[] = [];
  error: string = '';
  isLoading: boolean = true;

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.getTickets().subscribe({
      next: (response) => {
        this.tickets = Array.isArray(response)
          ? response
          : Object.values(response);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load tickets:', error);
        this.error = error.error.message || 'An error occurred';
        this.tickets = [];
        this.isLoading = false;
      },
    });
  }
}
