import { Injectable, Input } from '@angular/core';
import { Observable, from, tap } from 'rxjs';

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
    this.userEmail = user || '';
    return this.userEmail;
  }

  set User(email: string) {
    localStorage.setItem('user', email);
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

  validateSession(): Observable<boolean> {
    return from(this.shouldLoadRoute());
  }

  async shouldLoadRoute(): Promise<boolean> {
    if (await Session.doesSessionExist()) {
      let validationErrors = await Session.validateClaims();

      if (validationErrors.length === 0) {
        // user has verified their email address
        return true;
      }
    }
    // a session does not exist, or email is not verified
    return false;
  }
}
