import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // return true; active when development is done to give access to all routes only when logged
  const user = sessionStorage.getItem('user');
  const router = inject(Router);
  if(user != null){
    return true;
  } else{
    router.navigateByUrl('/login');
    return false;
  }
};
