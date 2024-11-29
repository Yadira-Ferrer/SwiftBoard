import { Component } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  title = 'SwiftBoard';
  subtitle = 'Simplifica tus tareas, acelera tus resultados.';
  showLogin = true;

  email = 'example@email.com';

  constructor(private themeService: ThemeService) {}

  changeTheme(theme: string) {
    this.themeService.switchTheme(theme);
  }

  changeForm(value: boolean) {
    if (value) {
      this.title = 'SwiftBoard';
      this.subtitle = 'Simplifica tus tareas, acelera tus resultados.';
    } else {
      this.title = 'Ingresa el código OTP';
      this.subtitle = 'Un código OTP ha sido enviado al correo';
    }
    this.showLogin = value;
  }
}
