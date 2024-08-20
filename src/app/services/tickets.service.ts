import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl = 'http://localhost:5000/api/tickets';

  constructor(private httpClient: HttpClient) {}

  getTickets(): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(`${this.apiUrl}/tickets`);
  }
}
export interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: string;
  // Add more fields as needed
}
