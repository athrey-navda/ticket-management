import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

interface LoginResponse {
  response: string;
  status: number;
  data: {
    _id: string;
    name: string;
    email: string;
    role: string;
    token: string;
  };
}

interface UserDetailsResponse {
  response: string;
  status: number;
  data: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

interface SupportStaffDetails {
  response: string;
  status: number;
  data: { [key: string]: User };
}
interface User {
  _id: string;
  name: string;
}
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api/users';

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, {
      email,
      password,
    });
  }

  signup(
    name: string,
    email: string,
    password: string,
    role: string
  ): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/register`, {
      name,
      email,
      password,
      role,
    });
  }

  getUserDetails(): Observable<UserDetailsResponse> {
    const token = this.cookieService.get('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get<UserDetailsResponse>(
      `${this.apiUrl}/user-details`,
      { headers }
    );
  }

  getStaffDetails(): Observable<SupportStaffDetails> {
    const token = this.cookieService.get('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get<SupportStaffDetails>(`${this.apiUrl}/support`, {
      headers,
    });
  }
}
