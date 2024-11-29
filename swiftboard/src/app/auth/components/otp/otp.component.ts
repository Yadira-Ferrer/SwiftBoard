import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import {
  consumeCode,
  clearLoginAttemptInfo,
  resendCode,
} from 'supertokens-web-js/recipe/passwordless';

import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['../styles/auth-styles.css'],
})
export class OtpComponent implements OnInit, OnDestroy {
  @Output() onBackToLogin: EventEmitter<boolean> = new EventEmitter();

  private subscription: Subscription | null = null;
  private timeLeft: number = 15;

  otpcode = '';
  message = '';
  counter: string = '00:15';
  isCounterActive: boolean = true;
  showResendButton: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.startCounter();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  startCounter() {
    this.timeLeft = 15;
    this.isCounterActive = true;
    this.showResendButton = false;

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = interval(1000)
      .pipe(takeWhile(() => this.timeLeft >= 0))
      .subscribe(() => {
        if (this.timeLeft === 0) {
          this.isCounterActive = false;
          this.showResendButton = true;
          this.counter = '00:00';
          if (this.subscription) {
            this.subscription.unsubscribe();
          }
        } else {
          const minutes = Math.floor(this.timeLeft / 60);
          const seconds = this.timeLeft % 60;
          this.counter = `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;
          this.timeLeft--;
        }
      });
  }

  async handleResendOTP() {
    try {
      const response = await resendCode();
      if (response.status === 'RESTART_FLOW_ERROR') {
        await clearLoginAttemptInfo();
        this.router.navigateByUrl('/auth');
        return;
      }
      this.startCounter();
      this.message = 'OTP resent successfully!';
      setTimeout(() => {
        if (this.message === 'OTP resent successfully!') {
          this.message = '';
        }
      }, 3000);
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        this.message = err.message;
      } else {
        this.message = 'Error resending OTP. Please try again.';
      }
    }
  }

  async backToLogin() {
    await clearLoginAttemptInfo();
    this.authService.clearUser();
    this.onBackToLogin.emit(true);
  }

  async handleOTPInput(otp: string = this.otpcode) {
    this.message = '';
    try {
      let response = await consumeCode({
        userInputCode: otp,
      });
      if (response.status === 'OK') {
        await clearLoginAttemptInfo();
        if (
          response.createdNewRecipeUser &&
          response.user.loginMethods.length === 1
        ) {
          // user sign up success
        } else {
          // user sign in success
        }
        //this.authService.retriveUserData();
        //const redirectUrl = this.authService.RedirectUrl;
        this.router.navigateByUrl('/home');
      } else if (response.status === 'INCORRECT_USER_INPUT_CODE_ERROR') {
        this.message =
          'Wrong OTP! Please try again. Number of attempts left: ' +
          (response.maximumCodeInputAttempts -
            response.failedCodeInputAttemptCount);
      } else if (response.status === 'EXPIRED_USER_INPUT_CODE_ERROR') {
        this.message =
          'Old OTP entered. Please regenerate a new one and try again';
      } else {
        await clearLoginAttemptInfo();
        this.message = 'Login failed. Please try again.';
        setTimeout(() => this.router.navigate(['/auth']), 4000);
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
