import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['../styles/auth-styles.css'],
})
export class OtpComponent {
  @Output() onBackToLogin: EventEmitter<boolean> = new EventEmitter();

  otpcode = '';
  message = '';
  counter: string = '00:15';
  isCounterActive: boolean = true;
  showResendButton: boolean = false;

  backToLogin() {
    this.onBackToLogin.emit(true);
  }

  async handleResendOTP() {}

  async handleOTPInput(otp: string = this.otpcode) {}
}
