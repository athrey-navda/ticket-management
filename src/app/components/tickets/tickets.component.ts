import { Component } from '@angular/core';
import { Ticket, TicketService } from '../../services/tickets.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

interface User {
  name: string;
  email: string;
  role: string;
}

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
  user: User | null = null;
  isUser: boolean = false;
  isAdminOrSupport: boolean = false;

  constructor(
    private ticketService: TicketService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.loadUserDetails();
    this.loadTickets();
  }

  loadUserDetails() {
    this.apiService.getUserDetails().subscribe({
      next: (response) => {
        this.user = response.data;

        this.isUser = this.user.role === 'user';
        this.isAdminOrSupport =
          this.user.role === 'admin' || this.user.role === 'support';
        this.loadTickets();
      },
      error: (error) => {
        this.user = null;
        this.isUser = false;
        this.isAdminOrSupport = false;
        this.loadTickets();
      },
    });
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
