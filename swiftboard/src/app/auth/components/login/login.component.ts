import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { createCode } from 'supertokens-web-js/recipe/passwordless';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../styles/auth-styles.css'],
})
export class LoginComponent {
  @Output() onLoginSubmit: EventEmitter<boolean> = new EventEmitter();

  email = '';
  message = '';

  constructor(private authService: AuthService) {}

  async sendOTP(email: string = this.email) {
    try {
      let response = await createCode({
        email,
      });

      if (response.status === 'SIGN_IN_UP_NOT_ALLOWED') {
        this.message = response.reason;
      } else {
        this.authService.User = this.email;
        this.onLoginSubmit.emit(false);
      }
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        this.message = err.message;
      } else {
        this.message = 'Oops! Something went wrong.';
      }
    }
  }
}
