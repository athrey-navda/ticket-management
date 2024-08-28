import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../../services/tickets.service';

@Component({
  selector: 'app-selected-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selected-tickets.component.html',
  styleUrl: './selected-tickets.component.css',
})
export class SelectedTicketsComponent {
  ticketId: string | null = null;
  ticket: any = null;
  isSuccess: string | null = null;
  successMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.ticketId = this.route.snapshot.paramMap.get('id');
    this.isSuccess = this.route.snapshot.queryParamMap.get('message');
    this.successMessage =
      this.isSuccess === 'true' ? 'Ticket edited successfully' : '';
    if (this.successMessage) {
      setTimeout(() => {
        this.successMessage = null;
      }, 5000);
    }

    if (this.ticketId) {
      this.fetchTicketDetails(this.ticketId);
    }
  }

  fetchTicketDetails(id: string): void {
    this.ticketService.getTicketById(id).subscribe({
      next: (data) => {
        this.ticket = data;
      },
      error: (error) => {
        console.error('Error fetching ticket details:', error);
      },
    });
  }
}
