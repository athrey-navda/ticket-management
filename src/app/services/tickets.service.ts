import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  private getToken(): string | null {
    return this.cookieService.get('access_token') || null;
  }

  getTickets(): Observable<Ticket[]> {
    const token = this.getToken();
    if (!token) {
      return of([]);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient
      .get<{ data: Ticket[] }>(`${this.apiUrl}/tickets`, { headers })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Failed to load tickets:', error);
          return of([]);
        })
      );
  }
}

export interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: string;
}
