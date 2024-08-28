import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private cookieService: CookieService,
    private authService: AuthService
  ) {}

  onSubmit() {
    this.apiService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.authService.login(response.data.token);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.error = error.error.data.message || 'An error occurred';
      },
    });
  }
}
