import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../styles/auth-styles.css'],
})
export class LoginComponent {
  @Output() onLoginSubmit: EventEmitter<boolean> = new EventEmitter();

  email = '';
  message = '';

  async sendOTP(email: string = this.email) {
    this.onLoginSubmit.emit(false);
  }
}
