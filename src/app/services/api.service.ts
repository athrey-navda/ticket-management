import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api/users';

  constructor(private httpClient: HttpClient) {}

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
}
