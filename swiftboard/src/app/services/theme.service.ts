import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  switchTheme() {
    let themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;

    if (themeLink) {
      const currentTheme = themeLink.getAttribute('href');
      themeLink.href = currentTheme?.includes('dark')
        ? 'lara-light.css'
        : 'lara-dark.css';
      /* themeLink.href = theme + '.css'; */
    }
  }
}
