import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { getLoginAttemptInfo } from 'supertokens-web-js/recipe/passwordless';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  title = 'SwiftBoard';
  subtitle = 'Simplifica tus tareas, acelera tus resultados.';
  showLogin = true;

  email = '';

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.email = this.authService.User;
  }

  changeTheme() {
    this.themeService.switchTheme();
  }

  changeForm(value: boolean) {
    if (value) {
      this.title = 'SwiftBoard';
      this.subtitle = 'Simplifica tus tareas, acelera tus resultados.';
      this.email = '';
    } else {
      this.title = 'Ingresa el código OTP';
      this.subtitle = 'Un código OTP ha sido enviado al correo';
      this.email = this.authService.User;
    }
    this.showLogin = value;
  }

  async hasInitialOTPBeenSent() {
    return (await getLoginAttemptInfo()) !== undefined;
  }
}
