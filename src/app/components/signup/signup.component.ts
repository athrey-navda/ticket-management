import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = '';

  constructor(private apiService: ApiService) {}

  onSubmit() {
    this.apiService
      .signup(this.name, this.email, this.password, this.role)
      .subscribe({
        next: (response) => {
          console.log('signup successful:', response);
        },
        error: (error) => {
          console.error('signup failed:', error);
        },
      });
  }
}
