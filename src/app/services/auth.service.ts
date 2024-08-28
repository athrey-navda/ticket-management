import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  authStatus = this.loggedIn.asObservable();

  constructor(private cookieService: CookieService, private router: Router) {
    this.updateAuthStatus();
  }

  private updateAuthStatus() {
    this.loggedIn.next(this.cookieService.check('access_token'));
  }

  login(token: string) {
    this.cookieService.set('access_token', token);
    this.updateAuthStatus();
  }

  logout() {
    this.cookieService.delete('access_token');
    this.updateAuthStatus();
    this.router.navigate([`/login`]);
  }
}
