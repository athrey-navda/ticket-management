import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../../services/tickets.service';
import { ApiService } from '../../../services/api.service';

interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: string;
  assignedTo: string;
}

interface User {
  _id: string;
  name: string;
}

@Component({
  selector: 'app-edit-tickets',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-tickets.component.html',
  styleUrls: ['./edit-tickets.component.css'],
})
export class EditTicketsComponent implements OnInit {
  ticketId: string | null = null;
  ticket: Ticket | null = null;
  _id: string = '';
  title: string = '';
  description: string = '';
  status: string = '';
  assignedTo: string = '';
  supportUsers: User[] = [];
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ticketId = this.route.snapshot.paramMap.get('id');
    if (this.ticketId) {
      this.fetchTicketDetails(this.ticketId);
    }
    this.fetchSupportUsers();
  }

  fetchTicketDetails(id: string): void {
    this.ticketService.getTicketById(id).subscribe({
      next: (data) => {
        this.ticket = data;
        this._id = this.ticket?._id || '';
        this.title = this.ticket?.title || '';
        this.description = this.ticket?.description || '';
        this.status = this.ticket?.status || '';
        this.assignedTo = this.ticket?.assignedTo || '';
      },
      error: (error) => {
        console.error('Error fetching ticket details:', error);
      },
    });
  }

  fetchSupportUsers(): void {
    this.apiService.getStaffDetails().subscribe({
      next: (response) => {
        if (response.response === 'success') {
          this.supportUsers = Object.values(response.data).map((user) => ({
            _id: user._id,
            name: user.name,
          })) as User[];
        } else {
          console.error('Failed to fetch users:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching support users:', error);
        this.error = error.error.data.message || 'An error occurred';
      },
    });
  }

  onSubmit() {
    this.ticketService
      .editTicket(
        this._id,
        this.title,
        this.description,
        this.status,
        this.assignedTo
      )
      .subscribe({
        next: (response) => {
          console.log('Edited ticket successfully:', response);
          this.router.navigate([`/selected-ticket/${this._id}`], {
            queryParams: { message: 'true' },
          });
        },
        error: (error) => {
          console.error('Edit ticket failed:', error);
          this.error = error.error.data.message || 'An error occurred';
        },
      });
  }
}
