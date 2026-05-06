import { effect, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLogged = await new Promise(resolve => {
    effect(() => {
      const value = authService.user();
      if (value !== undefined) {
        resolve(value !== null);
      }
    });
  });

  return isLogged ? true : router.parseUrl('/login');
};
