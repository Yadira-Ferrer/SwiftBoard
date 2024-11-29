import { Injectable, Input } from '@angular/core';

import Session from 'supertokens-web-js/recipe/session';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userEmail = '';

  constructor() {}

  @Input()
  get User(): string {
    const user = localStorage.getItem('user');
    this.userEmail = user ? JSON.parse(user) : null;
    return this.userEmail;
  }

  set User(email: string) {
    localStorage.setItem('user', this.userEmail);
    this.userEmail = email;
  }

  clearUser(): void {
    localStorage.removeItem('user');
    this.userEmail = '';
  }

  async logout() {
    await Session.signOut();
    this.clearUser();
    window.location.href = '/auth'; // or to wherever your logic page is
  }
}
