import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-herosection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './herosection.component.html',
  styleUrls: ['./herosection.component.css'],
})
export class HerosectionComponent implements OnInit {
  isLoggedIn: boolean = false;
  user: { name: string; email: string; role: string } | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getUserDetails().subscribe({
      next: (response) => {
        this.isLoggedIn = true;
        this.user = response.data;
      },
      error: (error) => {
        this.isLoggedIn = false;
        this.user = null;
      },
    });
  }
}
