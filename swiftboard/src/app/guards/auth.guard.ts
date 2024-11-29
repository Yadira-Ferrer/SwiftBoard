import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { tap, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.validateSession().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      }
      return router.createUrlTree(['/auth']);
    }),
    tap((result) => {
      if (typeof result !== 'boolean') {
        console.log('Redirecting to /auth');
        router.navigateByUrl('/auth');
      }
    })
  );
};
