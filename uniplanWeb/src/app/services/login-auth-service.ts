import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {
  private loggedIn = false;

  constructor() {
    this.loggedIn = !!localStorage.getItem('user');
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.loggedIn = false;
  }
}
