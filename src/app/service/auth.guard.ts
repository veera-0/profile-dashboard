import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MainService } from './main.service';

export const authGuard: CanActivateFn = (route, state) => {
  const mainService = inject(MainService);
  const router = inject(Router);

  if (mainService.isLoggedIn$.getValue()) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
