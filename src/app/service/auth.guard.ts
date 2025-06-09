import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // return true; active when development is done to give access to all routes only when logged
  return false;
};
